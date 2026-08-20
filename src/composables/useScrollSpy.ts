import { onBeforeUnmount, onMounted, ref } from 'vue'

// Port of js/quartzforge.js lines 197-222: an IntersectionObserver watches
// the section headings and the first one currently inside the reading band
// becomes the active TOC entry. The band is the viewport minus the sticky
// nav (88px) and minus the bottom 62%.
export function useScrollSpy(targetIds: string[]) {
  const activeId = ref<string | null>(null)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const visible = new Set<string>()
    observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id)
          else visible.delete(e.target.id)
        }
        activeId.value = targetIds.find((id) => visible.has(id)) ?? activeId.value
      },
      { rootMargin: '-88px 0px -62% 0px', threshold: 0 },
    )
    for (const id of targetIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { activeId }
}
