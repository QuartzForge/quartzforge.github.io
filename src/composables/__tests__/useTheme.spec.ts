import { describe, it, expect, beforeEach } from 'vitest'
import { useTheme } from '../useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark')
  })

  it('reflects the documentElement class', () => {
    document.documentElement.classList.add('dark')
    const { isDark } = useTheme()
    expect(isDark.value).toBe(true)
  })

  it('updates when the class changes', async () => {
    const { isDark } = useTheme()
    document.documentElement.classList.add('dark')
    await new Promise((r) => setTimeout(r, 0))
    expect(isDark.value).toBe(true)
    document.documentElement.classList.remove('dark')
    await new Promise((r) => setTimeout(r, 0))
    expect(isDark.value).toBe(false)
  })
})
