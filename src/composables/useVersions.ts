import { readonly, ref } from 'vue'
import baseline from '../data/versions.json'

export interface ReleaseInfo {
  version: string | null
  released: boolean
  crystal: string
}

export type Versions = Record<string, ReleaseInfo>

// Versions start from the committed baseline (never fabricated) and are
// refreshed at runtime against the GitHub "latest release" endpoint. A
// failed or rate-limited fetch keeps the baseline; the site never shows a
// version number it did not observe.
const REPOS = ['quartz', 'facet', 'vault'] as const

// GitHub's unauthenticated API allows 60 requests per hour per IP. The
// site never needs fresher data than every 15 minutes, and a failed
// attempt backs off for 5 minutes instead of hammering on every reload.
const SUCCESS_TTL_MS = 15 * 60 * 1000
const FAILURE_BACKOFF_MS = 5 * 60 * 1000

const versions = ref<Versions>({ ...baseline })

let nextAllowedAt = 0

export function useVersions() {
  return { versions: readonly(versions) }
}

export async function refreshVersions(): Promise<void> {
  const now = Date.now()
  if (now < nextAllowedAt) return

  const results = await Promise.all(
    REPOS.map(async (repo) => {
      try {
        const response = await fetch(`https://api.github.com/repos/QuartzForge/${repo}/releases/latest`, {
          headers: { Accept: 'application/vnd.github+json' },
        })
        if (!response.ok) return null
        const json = (await response.json()) as { tag_name?: string }
        if (!json.tag_name) return null
        return { repo, version: json.tag_name.replace(/^v/, '') }
      } catch {
        return null
      }
    }),
  )

  const anySuccess = results.some((result) => result !== null)
  nextAllowedAt = now + (anySuccess ? SUCCESS_TTL_MS : FAILURE_BACKOFF_MS)

  const merged: Versions = { ...versions.value }
  for (const result of results) {
    if (result) {
      const info = merged[result.repo]
      if (info) merged[result.repo] = { ...info, version: result.version, released: true }
    }
  }
  versions.value = merged
}
