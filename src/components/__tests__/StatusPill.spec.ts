import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import StatusPill from '../StatusPill.vue'
import ptBR from '../../locales/pt-BR'
import en from '../../locales/en'

function mountPill(status: 'released' | 'design') {
  const i18n = createI18n({ legacy: false, locale: 'pt-BR', messages: { 'pt-BR': ptBR, en } })
  return mount(StatusPill, { props: { status }, global: { plugins: [i18n] } })
}

describe('StatusPill', () => {
  it('renders the contract pill with a dot', () => {
    const w = mountPill('released')
    expect(w.find('.pill').exists()).toBe(true)
    expect(w.find('.dot').exists()).toBe(true)
  })

  it('uses pill-ok for released and neutral for design', () => {
    expect(mountPill('released').find('.pill').classes()).toContain('pill-ok')
    expect(mountPill('design').find('.pill').classes()).not.toContain('pill-ok')
  })
})
