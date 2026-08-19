import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import InstallShard from '../InstallShard.vue'
import ptBR from '../../locales/pt-BR'
import versions from '../../data/versions.json'

const i18n = createI18n({
  legacy: false,
  locale: 'pt-BR',
  messages: { 'pt-BR': ptBR },
})

// The shard block must mirror versions.json exactly: the recorded version when
// the project has a release, nothing otherwise. If the build-time fetch failed,
// versions.json carries no versions and the block must not render.
function expectShardOrNothing(wrapper: ReturnType<typeof mount>, recorded: string | null) {
  if (recorded) {
    expect(wrapper.text()).toContain('quartz')
    expect(wrapper.text()).toMatch(new RegExp(`version: ~> ${recorded.replace(/\./g, '\\.')}`))
  } else {
    expect(wrapper.find('pre').exists()).toBe(false)
  }
}

describe('InstallShard', () => {
  it('renders the shard.yml block with the version recorded in versions.json', () => {
    const quartz = versions.quartz
    const wrapper = mount(InstallShard, {
      props: { projectId: 'quartz' },
      global: { plugins: [i18n] },
    })

    expectShardOrNothing(wrapper, quartz?.released ? quartz.version : null)
  })

  it('renders nothing when the project has no release', () => {
    const vault = versions.vault
    const wrapper = mount(InstallShard, {
      props: { projectId: 'vault' },
      global: { plugins: [i18n] },
    })

    expectShardOrNothing(wrapper, vault?.released ? vault.version : null)
  })
})
