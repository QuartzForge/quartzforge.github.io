import { describe, it, expect } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import VersionBadge from '../VersionBadge.vue'
import ptBR from '../../locales/pt-BR'
import versions from '../../data/versions.json'

const i18n = createI18n({
  legacy: false,
  locale: 'pt-BR',
  messages: { 'pt-BR': ptBR },
})

// The badge must mirror versions.json exactly: the recorded version when the
// project has a release, the development label otherwise. Never a fabricated
// number — if the build-time fetch failed, versions.json carries no versions.
function expectVersionOrDevelopment(wrapper: VueWrapper, recorded: string | null) {
  if (recorded) {
    const escaped = recorded.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    expect(wrapper.text()).toMatch(new RegExp(`v${escaped}`))
  } else {
    expect(wrapper.text()).toContain('Em desenvolvimento')
  }
}

describe('VersionBadge', () => {
  it('shows the version recorded in versions.json when the project has a release', () => {
    const quartz = versions.quartz
    const wrapper = mount(VersionBadge, {
      props: { projectId: 'quartz' },
      global: { plugins: [i18n] },
    })

    expectVersionOrDevelopment(wrapper, quartz?.released ? quartz.version : null)
  })

  it('shows development status when the project has no release', () => {
    const obsidian = versions.obsidian
    const wrapper = mount(VersionBadge, {
      props: { projectId: 'obsidian' },
      global: { plugins: [i18n] },
    })

    expectVersionOrDevelopment(wrapper, obsidian?.released ? obsidian.version : null)
  })
})
