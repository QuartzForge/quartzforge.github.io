import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import SiteFooter from '../SiteFooter.vue'
import ptBR from '../../locales/pt-BR'
import en from '../../locales/en'

function mountFooter() {
  const i18n = createI18n({ legacy: false, locale: 'pt-BR', messages: { 'pt-BR': ptBR, en } })
  return mount(SiteFooter, {
    global: { plugins: [i18n], stubs: ['RouterLink'], renderStubDefaultSlot: true },
  })
}

describe('SiteFooter', () => {
  it('shows brand, four columns and the bottom bar with the current year', () => {
    const wrapper = mountFooter()
    expect(wrapper.find('.brand-mark').exists()).toBe(true)
    expect(wrapper.findAll('.footer-col').length).toBe(4)
    expect(wrapper.text()).toContain(String(new Date().getFullYear()))
    expect(wrapper.text()).toContain('MIT')
  })

  it('points the docs anchors at sections that exist in the guide', () => {
    const wrapper = mountFooter()
    const hrefs = wrapper
      .findAll('.footer-col a')
      .map((a) => a.attributes('href'))
      .filter((h): h is string => !!h)
    expect(hrefs).toContain('#instalacao')
    expect(hrefs).toContain('#controller')
    expect(hrefs).toContain('#erros')
    expect(hrefs).not.toContain('#primeira-rota')
  })

  it('links the community column to real org URLs', () => {
    const wrapper = mountFooter()
    const external = wrapper.findAll('a[target="_blank"]')
    expect(external.map((a) => a.attributes('href'))).toEqual(
      expect.arrayContaining([
        'https://github.com/QuartzForge',
        'https://github.com/orgs/QuartzForge/discussions',
        'https://github.com/QuartzForge/quartz/blob/develop/CONTRIBUTING.md',
      ]),
    )
  })
})
