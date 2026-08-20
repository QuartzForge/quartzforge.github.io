import { describe, it, expect, vi, beforeEach } from 'vitest'

const releases: Record<string, { tag_name: string }> = {
  quartz: { tag_name: 'v0.1.1' },
  facet: { tag_name: 'v0.1.0' },
}

function ok(json: unknown) {
  return new Response(JSON.stringify(json), { status: 200, headers: { 'Content-Type': 'application/json' } })
}

describe('useVersions', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('starts from the committed baseline', async () => {
    const { useVersions } = await import('../useVersions')
    const { versions } = useVersions()
    expect(versions.value.quartz.version).toBe('0.1.1')
    expect(versions.value.quartz.released).toBe(true)
    expect(versions.value.vault.released).toBe(false)
  })

  it('updates released projects from the GitHub API', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: RequestInfo | URL) => {
        const repo = String(url).split('/').at(-2)
        return releases[repo as string] ? ok(releases[repo as string]) : new Response(null, { status: 404 })
      }),
    )
    const { useVersions, refreshVersions } = await import('../useVersions')
    await refreshVersions()
    const { versions } = useVersions()
    expect(versions.value.quartz.version).toBe('0.1.1')
    expect(versions.value.quartz.released).toBe(true)
    expect(versions.value.facet.version).toBe('0.1.0')
    expect(versions.value.vault.released).toBe(false)
  })

  it('strips the leading v from the tag name', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ok({ tag_name: 'v0.2.0' })))
    const { useVersions, refreshVersions } = await import('../useVersions')
    await refreshVersions()
    expect(useVersions().versions.value.quartz.version).toBe('0.2.0')
  })

  it('keeps the baseline when the fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(null, { status: 403 })))
    const { useVersions, refreshVersions } = await import('../useVersions')
    await refreshVersions()
    const { versions } = useVersions()
    expect(versions.value.quartz.version).toBe('0.1.1')
    expect(versions.value.quartz.released).toBe(true)
  })

  it('keeps the baseline when the response has no tag', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ok({})))
    const { useVersions, refreshVersions } = await import('../useVersions')
    await refreshVersions()
    expect(useVersions().versions.value.facet.version).toBe('0.1.0')
  })

  it('does not hit the API again within the rate-limit window', async () => {
    vi.useFakeTimers()
    const fetchMock = vi.fn(async () => ok({ tag_name: 'v0.1.1' }))
    vi.stubGlobal('fetch', fetchMock)
    const { refreshVersions } = await import('../useVersions')
    vi.setSystemTime(0)
    await refreshVersions()
    vi.setSystemTime(10 * 60 * 1000)
    await refreshVersions()
    expect(fetchMock).toHaveBeenCalledTimes(3)
  })

  it('refetches once the rate-limit window has elapsed', async () => {
    vi.useFakeTimers()
    const fetchMock = vi.fn(async () => ok({ tag_name: 'v0.1.1' }))
    vi.stubGlobal('fetch', fetchMock)
    const { refreshVersions } = await import('../useVersions')
    vi.setSystemTime(0)
    await refreshVersions()
    vi.setSystemTime(16 * 60 * 1000)
    await refreshVersions()
    expect(fetchMock).toHaveBeenCalledTimes(6)
  })

  it('backs off briefly after a failed attempt', async () => {
    vi.useFakeTimers()
    const fetchMock = vi.fn(async () => new Response(null, { status: 403 }))
    vi.stubGlobal('fetch', fetchMock)
    const { refreshVersions } = await import('../useVersions')
    vi.setSystemTime(0)
    await refreshVersions()
    vi.setSystemTime(2 * 60 * 1000)
    await refreshVersions()
    expect(fetchMock).toHaveBeenCalledTimes(3)
    vi.setSystemTime(6 * 60 * 1000)
    await refreshVersions()
    expect(fetchMock).toHaveBeenCalledTimes(6)
  })
})
