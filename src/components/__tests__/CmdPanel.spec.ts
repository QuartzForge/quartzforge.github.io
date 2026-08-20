import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import CmdPanel from '../CmdPanel.vue'
import ptBR from '../../locales/pt-BR'
import en from '../../locales/en'

const tabs = [
  { id: 'cli', label: 'cli', code: '$ forge new billing\n$ cd billing && forge dev' },
]

const i18n = createI18n({ legacy: false, locale: 'pt-BR', messages: { 'pt-BR': ptBR, en } })

function mountPanel(props = { tabs }) {
  return mount(CmdPanel, { props, global: { plugins: [i18n] } })
}

describe('CmdPanel', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    delete (document as Omit<Document, 'execCommand'> & { execCommand?: unknown }).execCommand
  })

  it('renders the prompt prefix and copy button', () => {
    const w = mountPanel()
    expect(w.find('.pfx').exists()).toBe(true)
    expect(w.find('[data-copy]').exists()).toBe(true)
  })

  it('shows the translated copy label', () => {
    expect(mountPanel().find('[data-copy]').text()).toContain('copiar')
    const wEn = mount(CmdPanel, {
      props: { tabs },
      global: { plugins: [createI18n({ legacy: false, locale: 'en', messages: { 'pt-BR': ptBR, en } })] },
    })
    expect(wEn.find('[data-copy]').text()).toContain('copy')
  })

  it('copy strips the $ prompt from the copied text', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { clipboard: { writeText } })
    const w = mountPanel()
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
