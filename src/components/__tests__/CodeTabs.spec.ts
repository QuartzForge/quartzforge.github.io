import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import CodeTabs from '../CodeTabs.vue'
import ptBR from '../../locales/pt-BR'
import en from '../../locales/en'

const tabs = [
  { label: 'app', file: 'src/app.cr', code: 'class A' },
  { label: 'controller', file: 'src/c.cr', code: 'class C' },
]

const i18n = createI18n({ legacy: false, locale: 'pt-BR', messages: { 'pt-BR': ptBR, en } })

describe('CodeTabs', () => {
  it('renders a shadcn tabs list with one trigger per tab', () => {
    const w = mount(CodeTabs, { props: { tabs }, global: { plugins: [i18n] } })
    const triggers = w.findAll('[data-slot="tabs-trigger"]')
    expect(triggers).toHaveLength(2)
    expect(triggers[0].text()).toBe('app')
    expect(triggers[0].attributes('data-state')).toBe('active')
  })

  it('switches content and file label with the active tab', async () => {
    const w = mount(CodeTabs, { props: { tabs }, global: { plugins: [i18n] } })
    expect(w.find('[data-panel-label]').text()).toBe('src/app.cr')
    // reka-ui TabsTrigger activates on mousedown, mirroring radix's pointer
    // semantics — a real click always starts with one
    await w.find('[data-tab="controller"]').trigger('mousedown')
    await new Promise((r) => setTimeout(r, 80))
    expect(w.find('[data-panel-label]').text()).toBe('src/c.cr')
    expect(w.find('.shiki').text()).toContain('class C')
  })
})
