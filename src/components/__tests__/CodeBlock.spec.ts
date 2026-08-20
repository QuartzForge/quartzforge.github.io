import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import CodeBlock from '../CodeBlock.vue'
import ptBR from '../../locales/pt-BR'
import en from '../../locales/en'

const i18n = createI18n({ legacy: false, locale: 'pt-BR', messages: { 'pt-BR': ptBR, en } })

describe('CodeBlock', () => {
  beforeEach(() => {
    document.documentElement.classList.add('dark')
  })

  function mountBlock(code: string, file?: string, lang?: string) {
    return mount(CodeBlock, {
      props: { code, file, ...(lang ? { lang } : {}) },
      global: { plugins: [i18n] },
    })
  }

  it('shows the file label and a copy button', () => {
    const w = mountBlock('a = 1', 'src/app.cr')
    expect(w.text()).toContain('src/app.cr')
    expect(w.find('[data-copy]').exists()).toBe(true)
  })

  it('highlights with one-dark-pro in dark mode', async () => {
    const w = mountBlock('class X', 'x.cr')
    await new Promise((r) => setTimeout(r, 80))
    expect(w.find('.shiki').attributes('style')).toContain('#282c34')
  })

  it('highlights with one-light in light mode', async () => {
    document.documentElement.classList.remove('dark')
    const w = mountBlock('class X', 'x.cr')
    await new Promise((r) => setTimeout(r, 80))
    expect(w.find('.shiki').attributes('style')).toContain('#FAFAFA')
  })

  it('shows copied state and resets', async () => {
    vi.stubGlobal('navigator', { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } })
    vi.useFakeTimers()
    const w = mountBlock('a = 1', 'a.cr')
    await w.find('[data-copy]').trigger('click')
    await vi.advanceTimersByTimeAsync(0)
    expect(w.find('[data-copy]').attributes('data-copied')).toBe('true')
    vi.advanceTimersByTime(1700)
    // the ref flips inside the timer callback; the DOM attribute only updates
    // on Vue's next microtask flush
    await Promise.resolve()
    expect(w.find('[data-copy]').attributes('data-copied')).toBeUndefined()
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })
})
