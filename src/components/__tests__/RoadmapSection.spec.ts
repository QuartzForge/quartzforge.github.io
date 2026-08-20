import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import RoadmapSection from '../RoadmapSection.vue'
import ptBR from '../../locales/pt-BR'
import en from '../../locales/en'

function mountRoadmap() {
  const i18n = createI18n({ legacy: false, locale: 'pt-BR', messages: { 'pt-BR': ptBR, en } })
  return mount(RoadmapSection, {
    props: { items: ['Rate limiting middleware', 'WebSocket and SSE'] },
    global: { plugins: [i18n] },
  })
}

describe('RoadmapSection', () => {
  it('renders each item as a mono row with a planned badge', () => {
    const w = mountRoadmap()
    const rows = w.findAll('[data-roadmap-item]')
    expect(rows).toHaveLength(2)
    expect(rows[0].text()).toContain('Rate limiting middleware')
    expect(rows[0].classes().join(' ')).toContain('font-mono')
    const badge = rows[0].find('[data-slot="badge"]')
    expect(badge.exists()).toBe(true)
    expect(badge.text()).toContain(ptBR.project.roadmapPlanned)
  })

  it('uses the roadmap kicker and title from i18n', () => {
    const w = mountRoadmap()
    expect(w.text()).toContain(ptBR.project.roadmapKicker)
    expect(w.text()).toContain(ptBR.project.roadmapTitle)
  })
})
