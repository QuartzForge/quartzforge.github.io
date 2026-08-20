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
  it('renders the hero with kicker, headline and command panel', () => {
    const w = mountHome()
    expect(w.find('.kicker').exists()).toBe(true)
    expect(w.find('h1').exists()).toBe(true)
    expect(w.find('.cmd').exists()).toBe(true)
  })

  it('renders the six package cards including the ecosystem card', () => {
    const w = mountHome()
    expect(w.findAll('.pkg').length).toBe(6)
    expect(w.text()).toContain('todos')
  })

  it('marks the compiler demo as concept', () => {
    const w = mountHome()
    expect(w.find('#compilador').exists()).toBe(true)
    expect(w.find('#compilador .pill').text()).toContain('conceito')
  })

  it('shows the proof rows waiting for CI and the honest callout', () => {
    const w = mountHome()
    expect(w.text()).toContain('aguardando CI')
    expect(w.find('.callout-warn').exists()).toBe(true)
  })
})
