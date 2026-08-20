/// <reference types="node" />
import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

// NOTE: vite rewrites `new URL(x, import.meta.url)` at transform time into a
// resolution against a virtual `/@fs/...` path (no trailing slash), making the
// literal brief form ENOENT forever. Capturing the URL first bypasses the
// rewrite; the resolved root is the same repo root either way.
const base = import.meta.url
const root = new URL('../..', base).pathname

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? walk(join(dir, entry.name))
      : [join(dir, entry.name)],
  )
}

describe('design system contract (shadcn-vue flat palette)', () => {
  it('index.html loads Space Grotesk and Roboto Mono with preconnect', () => {
    const html = readFileSync(`${root}index.html`, 'utf8')
    expect(html).toContain('https://fonts.googleapis.com')
    expect(html).toContain('Space+Grotesk')
    expect(html).toContain('Roboto+Mono')
    expect(html).toContain('preconnect')
  })

  it('index.html bootstraps the .dark class before paint without flash', () => {
    const html = readFileSync(`${root}index.html`, 'utf8')
    expect(html).toMatch(/localStorage\.getItem\('qf-theme'\)/)
    expect(html).toMatch(/classList\.add\('dark'\)/)
    expect(html).toMatch(/classList\.remove\('dark'\)/)
    expect(html).not.toMatch(/data-theme/)
  })

  it('style.css declares the flat palette tokens', () => {
    const css = readFileSync(`${root}src/style.css`, 'utf8')
    expect(css).toContain('--primary: #7C3AED')
    expect(css).toContain('--background: #0F172A')
    expect(css).toContain('--pkg-quartz: #7C3AED')
    expect(css).toMatch(/\.dark\s*\{/)
    expect(css).not.toContain('--t-kw')
  })

  it('style.css keeps the hexagonal brand mark and base behavior', () => {
    const css = readFileSync(`${root}src/style.css`, 'utf8')
    expect(css).toContain('--crystal-hex: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)')
    expect(css).toContain('[data-reveal]')
    expect(css).toContain('scroll-padding-top')
    expect(css).toContain('.sr-only')
  })

  it('removes all gradients from style.css and views (flat palette)', () => {
    const files = [
      ...walk(`${root}src`).filter((f) => f.endsWith('.vue')),
      `${root}src/style.css`,
    ]
    for (const file of files) {
      const content = readFileSync(file, 'utf8')
      expect(content).not.toMatch(/conic-gradient|radial-gradient|linear-gradient/)
    }
  })
})
