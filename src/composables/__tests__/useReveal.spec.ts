import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { ObjectDirective } from 'vue'

// The real IntersectionObserver delivers entries asynchronously; the mock
// captures the callback so the spec can fire entries synchronously and
// assert on the element state. The module-level observer is recreated per
// test via vi.resetModules().
class MockObserver {
  static cb: IntersectionObserverCallback | null = null
  observed: Element[] = []

  constructor(cb: IntersectionObserverCallback) {
    MockObserver.cb = cb
  }

  observe(el: Element) {
    this.observed.push(el)
  }

  unobserve() {}

  disconnect() {}

  static fire(entries: IntersectionObserverEntry[]) {
    MockObserver.cb?.(entries, {} as IntersectionObserver)
  }
}

// Vue invokes a directive hook with (el, binding, vnode, prevVnode); the
// reveal implementation uses only the element, so the spec calls it with
// the same arity and ignores the trailing arguments.
function mounted(dir: ObjectDirective<HTMLElement>, el: HTMLElement): void {
  dir.mounted?.(el, {} as never, {} as never, {} as never)
}

describe('revealDirective', () => {
  beforeEach(() => {
    vi.resetModules()
    MockObserver.cb = null
    document.body.innerHTML = ''
    vi.stubGlobal('IntersectionObserver', MockObserver)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('marks the element with data-reveal on mount', async () => {
    const { revealDirective } = await import('../useReveal')
    const el = document.createElement('div')
    document.body.appendChild(el)
    mounted(revealDirective, el)
    expect(el.getAttribute('data-reveal')).not.toBeNull()
  })

  it('sets data-shown when the element enters the viewport', async () => {
    const { revealDirective } = await import('../useReveal')
    const el = document.createElement('div')
    document.body.appendChild(el)
    mounted(revealDirective, el)
    expect(el.getAttribute('data-shown')).toBeNull()
    MockObserver.fire([{ isIntersecting: true, target: el } as unknown as IntersectionObserverEntry])
    expect(el.getAttribute('data-shown')).toBe('true')
  })

  it('keeps the element hidden while it is out of the viewport', async () => {
    const { revealDirective } = await import('../useReveal')
    const el = document.createElement('div')
    mounted(revealDirective, el)
    MockObserver.fire([{ isIntersecting: false, target: el } as unknown as IntersectionObserverEntry])
    expect(el.getAttribute('data-shown')).toBeNull()
  })

  it('falls back to visible when IntersectionObserver is unavailable', async () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    const { revealDirective } = await import('../useReveal')
    const el = document.createElement('div')
    mounted(revealDirective, el)
    expect(el.getAttribute('data-reveal')).not.toBeNull()
    expect(el.getAttribute('data-shown')).toBe('true')
  })
})
