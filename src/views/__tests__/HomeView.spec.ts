import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import HomeView from '../HomeView.vue'
import ptBR from '../../locales/pt-BR'

const i18n = createI18n({
  legacy: false,
  locale: 'pt-BR',
  messages: { 'pt-BR': ptBR },
})

function mountHome() {
  return mount(HomeView, {
    global: {
      plugins: [i18n],
      // Stubbing a component by name replaces it with an empty element: the
      // named stub drops the component's own template, and only renders the
      // parent's default slot content when renderStubDefaultSlot is true.
      // CodeTabs is deliberately NOT stubbed — the code examples are its own
      // template, so a stub would remove them from the DOM and the assertions
      // below could never pass. CodeBlock (its async Shiki rendering) is
      // stubbed with a plain-text double so the example strings reach the DOM
      // synchronously and the tests are deterministic.
      renderStubDefaultSlot: true,
      stubs: {
        RouterLink: true,
        VersionBadge: true,
        StatusPill: true,
        InstallShard: true,
        CodeBlock: { props: ['code'], template: '<pre>{{ code }}</pre>' },
      },
    },
  })
}

describe('HomeView', () => {
  it('shows the five projects with real status', () => {
    const wrapper = mountHome()

    const text = wrapper.text()
    expect(text).toContain('quartz')
    expect(text).toContain('facet')
    expect(text).toContain('obsidian')
    expect(text).toContain('pulse')
    expect(text).toContain('vault')
  })

  it('contains the real quartz example code', () => {
    const wrapper = mountHome()

    const text = wrapper.text()
    expect(text).toContain('Quartz::Controller')
    expect(text).toContain('Quartz.run')
    expect(text).toContain('Hello, #{name}!')
  })

  it('renders the facet example with literal interpolation markers', async () => {
    const wrapper = mountHome()

    await wrapper.findAll('button')[1].trigger('click')

    const text = wrapper.text()
    expect(text).toContain('#{error.field}')
    expect(text).not.toContain('\\#{')
  })

  it('renders the principles from the active locale', () => {
    const wrapper = mountHome()

    expect(wrapper.text()).toContain('A macro só coleta')
  })
})
