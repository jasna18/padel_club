import type { Ref } from 'vue'

/**
 * Fades in every [data-reveal] element inside `root` the first time it scrolls into view
 * by adding an `in` class. Returns `armed`, which only turns true in the browser, so
 * content stays visible when JS hasn't run (SSR, crawlers).
 */
export function useReveal(root: Ref<HTMLElement | null>, threshold = 0.2) {
  const armed = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    armed.value = true
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('in')
          observer?.unobserve(entry.target)
        }
      },
      { threshold }
    )
    root.value?.querySelectorAll('[data-reveal]').forEach((el) => observer?.observe(el))
  })

  onBeforeUnmount(() => observer?.disconnect())

  return armed
}
