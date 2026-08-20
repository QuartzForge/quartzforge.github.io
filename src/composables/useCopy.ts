import { ref } from 'vue'

// Port of js/quartzforge.js lines 97-138: clipboard first, execCommand
// fallback for non-secure contexts, and a transient data-copied state.
// `$` prompts are stripped from the copied text, like the original.
export function useCopy() {
  const copied = ref(false)

  async function copy(text: string): Promise<void> {
    const clean = text.replace(/^\s*\$\s?/gm, '').trim()
    const done = () => {
      copied.value = true
      setTimeout(() => (copied.value = false), 1600)
    }
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(clean).then(done).catch(() => {})
      return
    }
    const ta = document.createElement('textarea')
    ta.value = clean
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    try {
      if (document.execCommand('copy')) done()
    } catch {
      /* no-op */
    }
    document.body.removeChild(ta)
  }

  return { copied, copy }
}
