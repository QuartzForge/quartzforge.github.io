import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import EcosystemView from '../EcosystemView.vue'
import ptBR from '../../locales/pt-BR'

const i18n = createI18n({
  legacy: false,
  locale: 'pt-BR',
  messages: { 'pt-BR': ptBR },
})

function mountEcosystem() {
  return mount(EcosystemView, {
    global: {
      plugins: [i18n],
      stubs: ['RouterLink', 'VersionBadge', 'StatusPill'],
    },
  })
}

describe('EcosystemView', () => {
  it('lists all five projects', () => {
    const wrapper = mountEcosystem()

    const text = wrapper.text()
    expect(text).toContain('quartz')
    expect(text).toContain('facet')
    expect(text).toContain('obsidian')
    expect(text).toContain('pulse')
    expect(text).toContain('vault')
  })

  it('shows the compatibility matrix with real constraints', () => {
    const wrapper = mountEcosystem()

    expect(wrapper.text()).toContain('~> 1.21')
    expect(wrapper.text()).toContain('MIT')
  })

  it('does not invent features (no WebSocket/SSE claims)', () => {
    const wrapper = mountEcosystem()

    expect(wrapper.text()).not.toContain('WebSocket')
    expect(wrapper.text()).not.toContain('SSE')
  })
})
