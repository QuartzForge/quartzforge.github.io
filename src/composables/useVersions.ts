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

const versions = ref<Versions>({ ...baseline })

export function useVersions() {
  return { versions: readonly(versions) }
}

export async function refreshVersions(): Promise<void> {
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

  const merged: Versions = { ...versions.value }
  for (const result of results) {
    if (result) {
      const info = merged[result.repo]
      if (info) merged[result.repo] = { ...info, version: result.version, released: true }
    }
  }
  versions.value = merged
}
