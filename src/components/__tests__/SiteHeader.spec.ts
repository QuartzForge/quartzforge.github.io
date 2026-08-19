import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import SiteHeader from '../SiteHeader.vue'
import ptBR from '../../locales/pt-BR'
import en from '../../locales/en'

function mountHeader() {
  const i18n = createI18n({
    legacy: false,
    locale: 'pt-BR',
    messages: { 'pt-BR': ptBR, en },
  })
  return mount(SiteHeader, {
    global: { plugins: [i18n], stubs: ['RouterLink'], renderStubDefaultSlot: true },
  })
}

describe('SiteHeader', () => {
  it('shows the brand and the three top-level links', () => {
    const wrapper = mountHeader()

    expect(wrapper.text()).toContain('QuartzForge')
    expect(wrapper.text()).toContain('Visão geral')
    expect(wrapper.text()).toContain('Ecossistema')
    expect(wrapper.text()).toContain('Documentação')
  })

  it('switches locale and persists it', async () => {
    const wrapper = mountHeader()

    await wrapper.find('select').setValue('en')

    expect(localStorage.getItem('qf-locale')).toBe('en')
    expect(wrapper.text()).toContain('Overview')
  })
})
