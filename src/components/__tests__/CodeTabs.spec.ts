import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CodeTabs from '../CodeTabs.vue'

const tabs = [
  { label: 'app', file: 'src/app.cr', code: 'class A' },
  { label: 'controller', file: 'src/c.cr', code: 'class C' },
]

describe('CodeTabs', () => {
  beforeEach(() => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false, addListener: vi.fn() }))
    vi.stubGlobal('navigator', { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } })
  })

  it('switches tabs with arrow keys', async () => {
    const w = mount(CodeTabs, { props: { tabs } })
    await w.find('[data-tab="app"]').trigger('keydown', { key: 'ArrowRight' })
    expect(w.find('[data-tab="controller"]').attributes('aria-selected')).toBe('true')
    await w.find('[data-tab="controller"]').trigger('keydown', { key: 'ArrowLeft' })
    expect(w.find('[data-tab="app"]').attributes('aria-selected')).toBe('true')
  })

  it('updates the file label with the active tab', async () => {
    const w = mount(CodeTabs, { props: { tabs } })
    await w.find('[data-tab="controller"]').trigger('click')
    expect(w.find('[data-panel-label]').text()).toBe('src/c.cr')
  })

  it('marks the active tab with the accent underline class', async () => {
    const w = mount(CodeTabs, { props: { tabs } })
    expect(w.find('[data-tab="app"]').classes()).toContain('panel-tab-active')
  })
})
