import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import CmdPanel from '../CmdPanel.vue'
import ptBR from '../../locales/pt-BR'
import en from '../../locales/en'

const tabs = [
  {
    id: 'shards',
    label: 'shard.yml',
    code: 'dependencies:\n  quartz:\n    github: QuartzForge/quartz\n    version: ~> 0.1.1',
  },
]

const i18n = createI18n({ legacy: false, locale: 'pt-BR', messages: { 'pt-BR': ptBR, en } })

describe('CmdPanel', () => {
  beforeEach(() => {
    document.documentElement.classList.add('dark')
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    delete (document as Omit<Document, 'execCommand'> & { execCommand?: unknown }).execCommand
  })

  function mountPanel(props: Record<string, unknown> = { tabs }) {
    return mount(CmdPanel, { props, global: { plugins: [i18n] } })
  }

  it('renders the dependencies example with the code theme', async () => {
    const w = mountPanel()
    await new Promise((r) => setTimeout(r, 80))
    expect(w.find('.shiki').exists()).toBe(true)
    expect(w.find('.shiki').attributes('style')).toContain('#282c34')
  })

  it('copy strips the $ prompt from the copied text', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { clipboard: { writeText } })
    const w = mountPanel({
      tabs: [{ id: 'cli', label: 'cli', code: '$ forge new billing\n$ cd billing && forge dev' }],
    })
    await w.find('[data-copy]').trigger('click')
    await new Promise((r) => setTimeout(r, 0))
    expect(writeText).toHaveBeenCalledWith('forge new billing\ncd billing && forge dev')
  })

  it('falls back to execCommand when clipboard is unavailable', async () => {
    vi.stubGlobal('navigator', {})
    const exec = vi.fn(() => true)
    Object.defineProperty(document, 'execCommand', { value: exec, configurable: true })
    const w = mountPanel()
    await w.find('[data-copy]').trigger('click')
    expect(exec).toHaveBeenCalledWith('copy')
  })
})
