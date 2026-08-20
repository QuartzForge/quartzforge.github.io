import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import CodeBlock from '../CodeBlock.vue'
import ptBR from '../../locales/pt-BR'
import en from '../../locales/en'

const i18n = createI18n({ legacy: false, locale: 'pt-BR', messages: { 'pt-BR': ptBR, en } })

function mountBlock(code: string, file?: string) {
  return mount(CodeBlock, { props: { code, file }, global: { plugins: [i18n] } })
}

describe('CodeBlock', () => {
  beforeEach(() => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false, addListener: vi.fn() }))
  })

  it('shows the file label in the panel head', () => {
    const w = mountBlock('a = 1', 'src/app.cr')
    expect(w.text()).toContain('src/app.cr')
  })

  it('renders highlighted html from the quartzforge theme', async () => {
    const w = mountBlock('class X', 'x.cr')
    await new Promise((r) => setTimeout(r, 50))
    expect(w.find('.shiki').exists()).toBe(true)
    expect(w.find('.shiki').attributes('style')).toContain('#0B1120')
  })

  it('shows the translated copy label', () => {
    expect(mountBlock('a = 1', 'a.cr').find('[data-copy]').text()).toContain('copiar')
  })

  it('shows copied state and resets it', async () => {
    vi.stubGlobal('navigator', { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } })
    vi.useFakeTimers()
    const w = mountBlock('a = 1', 'a.cr')
    await w.find('[data-copy]').trigger('click')
    await vi.advanceTimersByTimeAsync(0)
    expect(w.find('[data-copy]').attributes('data-copied')).toBe('true')
    expect(w.find('[data-copy]').text()).toContain('copiado')
    vi.advanceTimersByTime(1700)
    // the ref flips inside the timer callback; the DOM attribute only updates
    // on Vue's next microtask flush
    await Promise.resolve()
    expect(w.find('[data-copy]').attributes('data-copied')).toBeUndefined()
    vi.useRealTimers()
  })
})
