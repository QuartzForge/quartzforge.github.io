import { getCurrentInstance, onBeforeUnmount, ref } from 'vue'

// The site defaults to dark (the index.html bootstrap adds .dark before
// paint); the ref tracks the documentElement class so the code theme and
// the site theme always agree, whichever component toggles it. The observer
// is created eagerly on the first call (the composable also works outside
// a component) and lives for the app: any toggle path keeps it in sync.
const isDark = ref(true)
let observer: MutationObserver | null = null

function sync() {
  isDark.value = document.documentElement.classList.contains('dark')
}

export function useTheme() {
  sync()
  if (!observer && typeof MutationObserver !== 'undefined') {
    observer = new MutationObserver(sync)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  }
  const instance = getCurrentInstance()
  if (instance) {
    onBeforeUnmount(() => {
      observer?.disconnect()
      observer = null
    })
  }
  return { isDark }
}
