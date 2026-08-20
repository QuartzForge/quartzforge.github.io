import { describe, it, expect } from 'vitest'
import { crystalTheme } from './crystal'

// ThemeRegistration marks colors/tokenColors optional; the spec needs the
// concrete shape, so the theme is narrowed locally.
const theme = crystalTheme as typeof crystalTheme & {
  colors: Record<string, string>
  tokenColors: { scope?: string | string[]; settings: { foreground?: string; fontStyle?: string } }[]
}

describe('crystalTheme (crystal-lang.org syntax)', () => {
  it('is a dark Shiki theme named quartzforge', () => {
    expect(theme.name).toBe('quartzforge')
    expect(theme.type).toBe('dark')
  })

  it('uses the contract code background and foreground', () => {
    expect(theme.colors['editor.background']).toBe('#212121')
    expect(theme.colors['editor.foreground']).toBe('#e6e6e6')
  })

  it('paints keyword, constant, string, number and comment with the crystal-lang.org values', () => {
    const byScope = (scope: string) =>
      theme.tokenColors.find((t) => t.scope === scope)?.settings.foreground
    expect(byScope('keyword')).toBe('#7294d5')
    expect(byScope('constant')).toBe('#cf8568')
    expect(byScope('string')).toBe('#46be5a')
    expect(byScope('number')).toBe('#c27ece')
    expect(byScope('comment')).toBe('#a6a6a6')
  })

  it('does not give function/name calls a color (methods stay sober)', () => {
    const fn = theme.tokenColors.find((t) => t.scope === 'function')
    expect(fn?.settings.foreground).toBeUndefined()
    expect(fn?.settings.fontStyle).toBeUndefined()
  })
})
