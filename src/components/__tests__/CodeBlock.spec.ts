import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CodeBlock from '../CodeBlock.vue'

describe('CodeBlock', () => {
  beforeEach(() => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false, addListener: vi.fn() }))
  })

  it('shows the file label in the panel head', () => {
    const w = mount(CodeBlock, { props: { code: 'a = 1', file: 'src/app.cr' } })
    expect(w.text()).toContain('src/app.cr')
  })

  it('renders highlighted html from the quartzforge theme', async () => {
    const w = mount(CodeBlock, { props: { code: 'class X', file: 'x.cr' } })
    await new Promise((r) => setTimeout(r, 50))
    expect(w.find('.shiki').exists()).toBe(true)
    expect(w.find('.shiki').attributes('style')).toContain('#212121')
  })

  it('shows copied state and resets it', async () => {
    vi.stubGlobal('navigator', { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } })
    vi.useFakeTimers()
    const w = mount(CodeBlock, { props: { code: 'a = 1', file: 'a.cr' } })
    await w.find('[data-copy]').trigger('click')
    await vi.advanceTimersByTimeAsync(0)
    expect(w.find('[data-copy]').attributes('data-copied')).toBe('true')
    vi.advanceTimersByTime(1700)
    // the ref flips inside the timer callback; the DOM attribute only updates
    // on Vue's next microtask flush
    await Promise.resolve()
    expect(w.find('[data-copy]').attributes('data-copied')).toBeUndefined()
    vi.useRealTimers()
  })
})
