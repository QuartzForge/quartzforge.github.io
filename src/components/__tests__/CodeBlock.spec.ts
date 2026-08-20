import { describe, it, expect, vi } from 'vitest'
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
  it('shows the file label and a copy button', () => {
    const w = mountBlock('a = 1', 'src/app.cr')
    expect(w.text()).toContain('src/app.cr')
    expect(w.find('[data-copy]').exists()).toBe(true)
  })

  it('highlights with the neutral one-dark-pro theme', async () => {
    const w = mountBlock('class X', 'x.cr')
    await new Promise((r) => setTimeout(r, 80))
    const shiki = w.find('.shiki')
    expect(shiki.exists()).toBe(true)
    expect(shiki.attributes('style')).toContain('#282c34')
  })

  it('leaves a bigger gap between the code and the panel borders', () => {
    const w = mountBlock('a = 1', 'a.cr')
    expect(w.find('[data-code-body]').classes()).toContain('p-6')
    expect(w.find('[data-code-header]').classes()).toContain('px-5')
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
