import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CmdPanel from '../CmdPanel.vue'

const tabs = [
  { id: 'cli', label: 'cli', code: '$ forge new billing\n$ cd billing && forge dev' },
]

describe('CmdPanel', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    delete (document as Omit<Document, 'execCommand'> & { execCommand?: unknown }).execCommand
  })

  it('renders the prompt prefix and copy button', () => {
    const w = mount(CmdPanel, { props: { tabs } })
    expect(w.find('.pfx').exists()).toBe(true)
    expect(w.find('[data-copy]').exists()).toBe(true)
  })

  it('copy strips the $ prompt from the copied text', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { clipboard: { writeText } })
    const w = mount(CmdPanel, { props: { tabs } })
    await w.find('[data-copy]').trigger('click')
    await new Promise((r) => setTimeout(r, 0))
    expect(writeText).toHaveBeenCalledWith('forge new billing\ncd billing && forge dev')
  })

  it('falls back to execCommand when clipboard is unavailable', async () => {
    vi.stubGlobal('navigator', {})
    const exec = vi.fn(() => true)
    Object.defineProperty(document, 'execCommand', { value: exec, configurable: true })
    const w = mount(CmdPanel, { props: { tabs } })
    await w.find('[data-copy]').trigger('click')
    expect(exec).toHaveBeenCalledWith('copy')
  })
})
