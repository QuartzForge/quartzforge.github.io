import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import VersionBadge from '../VersionBadge.vue'
import ptBR from '../../locales/pt-BR'
import en from '../../locales/en'

vi.mock('../../data/versions.json', () => ({
  default: { quartz: { version: '0.1.1', released: true }, facet: { version: '0.1.0', released: true }, vault: { released: false } },
}))

function mountBadge(projectId: string) {
  const i18n = createI18n({ legacy: false, locale: 'pt-BR', messages: { 'pt-BR': ptBR, en } })
  return mount(VersionBadge, { props: { projectId }, global: { plugins: [i18n] } })
}

describe('VersionBadge', () => {
  it('shows the released version in mono inside an outline Badge', () => {
    const w = mountBadge('quartz')
    const badge = w.get('[data-slot="badge"]')
    expect(badge.classes()).toEqual(expect.arrayContaining(['border', 'text-foreground']))
    expect(badge.find('span.font-mono').text()).toBe('v0.1.1')
  })

  it('shows an honest in-development pill for unreleased projects', () => {
    const w = mountBadge('vault')
    expect(w.get('[data-slot="badge"]').classes()).toContain('bg-secondary')
    expect(w.text()).toContain('em desenvolvimento')
  })
})
