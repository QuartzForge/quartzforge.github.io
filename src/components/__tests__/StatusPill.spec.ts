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
  it('renders released as an outline Badge with a primary dot', () => {
    const w = mountPill('released')
    const badge = w.get('[data-slot="badge"]')
    expect(badge.classes()).toEqual(expect.arrayContaining(['border', 'text-foreground']))
    expect(badge.find('span[aria-hidden="true"]').classes()).toContain('bg-primary')
  })

  it('renders design as a secondary Badge with a muted dot', () => {
    const w = mountPill('design')
    const badge = w.get('[data-slot="badge"]')
    expect(badge.classes()).toContain('bg-secondary')
    expect(badge.find('span[aria-hidden="true"]').classes()).toContain('bg-muted-foreground/50')
  })

  it('translates the label for both statuses', () => {
    expect(mountPill('released').text()).toContain('estável')
    expect(mountPill('design').text()).toContain('em desenvolvimento')
  })
})
