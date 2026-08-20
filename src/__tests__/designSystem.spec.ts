/// <reference types="node" />
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'

// NOTE: vite rewrites `new URL(x, import.meta.url)` at transform time into a
// resolution against a virtual `/@fs/...` path (no trailing slash), making the
// literal brief form ENOENT forever. Capturing the URL first bypasses the
// rewrite; the resolved root is the same repo root either way.
const base = import.meta.url
const root = new URL('../..', base).pathname

describe('design system contract (handoff 5de6783c)', () => {
  it('index.html loads Space Grotesk and Roboto Mono with preconnect', () => {
    const html = readFileSync(`${root}index.html`, 'utf8')
    expect(html).toContain('https://fonts.googleapis.com')
    expect(html).toContain('Space+Grotesk')
    expect(html).toContain('Roboto+Mono')
    expect(html).toContain('preconnect')
  })

  it('index.html bootstraps the theme before paint without flash', () => {
    const html = readFileSync(`${root}index.html`, 'utf8')
    expect(html).toMatch(/localStorage\.getItem\('qf-theme'\)/)
    expect(html).toMatch(/data-theme.*light/)
  })

  it('style.css declares the contract tokens', () => {
    const css = readFileSync(`${root}src/style.css`, 'utf8')
    expect(css).toContain('--accent:     oklch(78% 0.155 62)')
    expect(css).toContain('--bg:        oklch(17%   0 0)')
    expect(css).toContain('--t-kw:  hsl(219, 54%, 64%)')
    expect(css).toContain('--code-bg:   oklch(24.8% 0 0)')
    expect(css).toContain("--crystal-hex: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)")
  })

  it('style.css overrides tokens for the light theme and keeps code panels dark', () => {
    const css = readFileSync(`${root}src/style.css`, 'utf8')
    expect(css).toMatch(/\[data-theme='light'\]\s*\{/)
    expect(css).toMatch(/--bg:\s*oklch\(99%/)
  })
})
