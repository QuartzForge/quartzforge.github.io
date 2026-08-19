import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import DocsView from '../DocsView.vue'
import ptBR from '../../locales/pt-BR'

const i18n = createI18n({
  legacy: false,
  locale: 'pt-BR',
  messages: { 'pt-BR': ptBR },
})

// A name stub renders an empty element — the HomeView spec documents this
// trap. CodeBlock (its async Shiki rendering) is stubbed with a plain-text
// double so the code strings reach the DOM synchronously and the assertions
// below can pass.
function mountDocs() {
  return mount(DocsView, {
    global: {
      plugins: [i18n],
      stubs: {
        RouterLink: true,
        CodeBlock: { props: ['code'], template: '<pre>{{ code }}</pre>' },
        CodeTabs: true,
      },
    },
  })
}

describe('DocsView', () => {
  it('covers the real installation versions', () => {
    const wrapper = mountDocs()

    expect(wrapper.text()).toContain('~> 0.1.1')
    expect(wrapper.text()).toContain('~> 0.1.0')
  })

  it('uses only real APIs', () => {
    const wrapper = mountDocs()

    const text = wrapper.text()
    expect(text).toContain('Facet::Assert::NotBlank')
    expect(text).toContain('Quartz::Controller')
    expect(text).not.toContain('Quartz::App')
    expect(text).not.toContain('Facet::Schema')
  })

  it('documents the real RFC 9457 error types', () => {
    const wrapper = mountDocs()

    const text = wrapper.text()
    expect(text).toContain('quartzforge.org/errors/bad-request')
    expect(text).toContain('quartzforge.org/errors/bind-error')
  })
})
