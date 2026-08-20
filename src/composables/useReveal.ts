import type { ObjectDirective } from 'vue'

let revealObserver: IntersectionObserver | null = null

function ensureObserver() {
  if (revealObserver || typeof IntersectionObserver === 'undefined') return
  revealObserver = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        e.target.setAttribute('data-shown', 'true')
        revealObserver?.unobserve(e.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  )
}

export const revealDirective: ObjectDirective<HTMLElement> = {
  mounted(el) {
    el.setAttribute('data-reveal', '')
    ensureObserver()
    if (revealObserver) revealObserver.observe(el)
    else el.setAttribute('data-shown', 'true')
  },
  unmounted(el) {
    revealObserver?.unobserve(el)
  },
}
