import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { readFileSync } from 'node:fs'
import BrandMark from '../BrandMark.vue'

const base = import.meta.url
const css = readFileSync(new URL('../../style.css', base).pathname, 'utf8')

describe('BrandMark', () => {
  it('renders a single decorative span', () => {
    const w = mount(BrandMark)
    expect(w.find('span.brand-mark[aria-hidden="true"]').exists()).toBe(true)
  })

  it('is flat: hexagonal clip-path with a background cutout, no gradient', () => {
    const block = css.slice(css.indexOf('.brand-mark {'), css.indexOf('.brand-mark::after'))
    expect(block).toContain('clip-path: var(--crystal-hex)')
    expect(block).toContain('background: var(--primary)')
    expect(block).not.toMatch(/background-image|gradient/)
  })

  it('cuts the hexagon out of the inner layer with the background color', () => {
    const block = css.slice(css.indexOf('.brand-mark::after'), css.indexOf('[data-reveal]'))
    expect(block).toContain('background: var(--background)')
    expect(block).toContain('clip-path: var(--crystal-hex)')
  })
})
