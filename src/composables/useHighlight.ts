import { ref, watch, type Ref } from 'vue'
import { bundledLanguages, getSingletonHighlighter, type BundledLanguage } from 'shiki'
import { useTheme } from './useTheme'

// Shared Shiki pipeline: the highlighter is created once as a module-level
// singleton and languages load on demand. The theme follows the site
// (one-dark-pro in dark mode, one-light in light mode), so a theme toggle
// re-renders the code with the matching palette. Any failure (offline wasm,
// unknown language, ...) degrades to a plain <pre> via `failed`.
export function useHighlight(code: Ref<string>, lang: Ref<string>) {
  const { isDark } = useTheme()
  const html = ref('')
  const failed = ref(false)
  let renderSeq = 0

  async function render() {
    const seq = ++renderSeq
    const theme = isDark.value ? 'one-dark-pro' : 'one-light'
    try {
      const highlighter = await getSingletonHighlighter({ themes: ['one-dark-pro', 'one-light'] })
      const requested: BundledLanguage | 'text' =
        lang.value in bundledLanguages ? (lang.value as BundledLanguage) : 'text'
      if (!highlighter.getLoadedLanguages().includes(requested)) {
        await highlighter.loadLanguage(requested)
      }
      if (seq !== renderSeq) return
      html.value = highlighter.codeToHtml(code.value, { lang: requested, theme })
      failed.value = false
    } catch {
      if (seq !== renderSeq) return
      failed.value = true
    }
  }

  watch([code, lang, isDark], render, { immediate: true })

  return { html, failed }
}
