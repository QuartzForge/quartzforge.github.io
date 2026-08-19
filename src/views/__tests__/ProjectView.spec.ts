import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import ProjectView from '../ProjectView.vue'
import ptBR from '../../locales/pt-BR'

const i18n = createI18n({
  legacy: false,
  locale: 'pt-BR',
  messages: { 'pt-BR': ptBR },
})

// CodeTabs and RoadmapSection are deliberately NOT stubbed: what the assertions
// check lives in their own templates (the code examples and the 'Roadmap'
// heading), so a name stub would drop it from the DOM and the tests could never
// pass — the HomeView spec documents this exact trap. CodeBlock (its async
// Shiki rendering) is stubbed with a plain-text double so the example strings
// reach the DOM synchronously and the tests stay deterministic.
function mountProject(projectId: string) {
  return mount(ProjectView, {
    props: { projectId },
    global: {
      plugins: [i18n],
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

describe('ProjectView', () => {
  it('shows real code for a released project', () => {
    const wrapper = mountProject('quartz')

    expect(wrapper.text()).toContain('Quartz::Controller')
  })

  it('shows no code and a development disclaimer for a design project', () => {
    const wrapper = mountProject('obsidian')

    expect(wrapper.text()).toContain('Em desenvolvimento')
    expect(wrapper.text()).not.toContain('class Invoice')
  })

  it('shows the roadmap for a design project', () => {
    const wrapper = mountProject('pulse')

    expect(wrapper.text()).toContain('Roadmap')
  })
})
