<script setup lang="ts">
const open = ref(false)
const scrolled = ref(false)

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/#about' },
  { label: 'Contact Us', to: '/#contact' }
]

function onScroll() {
  scrolled.value = window.scrollY > 40
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}

watch(open, (v) => {
  document.documentElement.style.overflow = v ? 'hidden' : ''
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header class="header" :class="{ scrolled }">
    <div class="header-inner container">
      <NuxtLink to="/" class="brand" aria-label="Euro Padel home">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.6">
            <circle cx="16" cy="16" r="13" />
            <path d="M3 16h26M16 3c-4 4-4 22 0 26" />
          </svg>
        </span>
        <span class="brand-name">Euro Padel</span>
      </NuxtLink>

      <div class="header-actions">
        <a href="#book" class="btn book-btn">Book a Court</a>
        <button
          class="burger"
          type="button"
          :aria-expanded="open"
          aria-controls="site-drawer"
          aria-label="Open menu"
          @click="open = true"
        >
          <span />
          <span />
        </button>
      </div>
    </div>
  </header>

  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="drawer-backdrop" @click="open = false" />
    </Transition>
    <Transition name="drawer">
      <aside
        v-if="open"
        id="site-drawer"
        class="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div class="drawer-head">
          <span class="eyebrow">Menu</span>
          <button class="drawer-close" type="button" aria-label="Close menu" @click="open = false">
            <span />
            <span />
          </button>
        </div>

        <nav class="drawer-nav">
          <NuxtLink
            v-for="(l, i) in links"
            :key="l.label"
            :to="l.to"
            class="drawer-link"
            :style="{ '--i': i }"
            @click="open = false"
          >
            <span class="drawer-num">0{{ i + 1 }}</span>
            <span class="drawer-label">{{ l.label }}</span>
            <span class="drawer-arrow" aria-hidden="true">→</span>
          </NuxtLink>
        </nav>

        <div class="drawer-foot">
          <p class="drawer-foot-title">Visit us</p>
          <p>Al Quoz, Dubai — United Arab Emirates</p>
          <p>Open daily · 7:00 – 24:00</p>
          <a href="#book" class="btn drawer-cta" @click="open = false">Book a Court <span aria-hidden="true">→</span></a>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  transition: padding 0.4s ease;
}

.header.scrolled {
  padding-top: 14px;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-h);
  border: 1px solid transparent;
  transition: height 0.4s ease, max-width 0.4s ease, background 0.4s ease, border-color 0.4s ease,
    border-radius 0.4s ease, box-shadow 0.4s ease;
}

.header.scrolled .header-inner {
  height: 64px;
  max-width: 1240px;
  width: calc(100% - 32px);
  padding: 0 10px 0 24px;
  background: rgba(246, 240, 233, 0.82);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  border-color: rgba(255, 255, 255, 0.7);
  border-radius: 999px;
  box-shadow: 0 14px 44px rgba(38, 48, 58, 0.1);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-mark {
  color: var(--coral);
  display: grid;
  place-items: center;
}

.brand-name {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.24em;
  line-height: 1;
  text-transform: uppercase;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.book-btn {
  padding: 11px 22px;
  font-size: 13px;
}

/* Two-line menu button */
.burger {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.55);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition: background 0.3s ease, border-color 0.3s ease;
}

.burger span {
  display: block;
  height: 1.5px;
  background: var(--ink);
  border-radius: 2px;
  transition: width 0.35s var(--ease), transform 0.35s var(--ease);
}

.burger span:first-child {
  width: 20px;
}

.burger span:last-child {
  width: 13px;
  transform: translateX(3.5px);
}

.burger:hover {
  background: #fff;
  border-color: var(--peach);
}

.burger:hover span:last-child {
  width: 20px;
  transform: none;
}

/* Drawer */
.drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 110;
  background: rgba(38, 48, 58, 0.28);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 120;
  width: min(440px, 100vw);
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background: var(--sand);
  box-shadow: -30px 0 80px rgba(38, 48, 58, 0.16);
  overflow-y: auto;
}

.drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  border-bottom: 1px solid var(--line);
}

.drawer-close {
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: #fff;
  cursor: pointer;
  transition: transform 0.35s ease, border-color 0.3s ease;
}

.drawer-close span {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 1.5px;
  background: var(--ink);
}

.drawer-close span:first-child {
  transform: translate(-50%, -50%) rotate(45deg);
}

.drawer-close span:last-child {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.drawer-close:hover {
  transform: rotate(90deg);
  border-color: var(--peach);
}

.drawer-nav {
  display: flex;
  flex-direction: column;
  padding: 28px 32px;
  flex: 1;
}

.drawer-link {
  display: flex;
  align-items: baseline;
  gap: 18px;
  padding: 18px 0;
  border-bottom: 1px solid var(--line);
  opacity: 0;
  transform: translateX(24px);
  animation: link-in 0.5s var(--ease) forwards;
  animation-delay: calc(0.12s + var(--i) * 0.07s);
}

.drawer-num {
  font-size: 12px;
  color: var(--coral);
  letter-spacing: 0.1em;
}

.drawer-label {
  font-family: var(--serif);
  font-size: clamp(34px, 5vw, 44px);
  line-height: 1;
  transition: color 0.25s ease;
}

.drawer-arrow {
  margin-left: auto;
  font-size: 20px;
  color: var(--ink-soft);
  transition: transform 0.25s ease, color 0.25s ease;
}

.drawer-link:hover .drawer-label,
.drawer-link:hover .drawer-arrow {
  color: var(--coral);
}

.drawer-link:hover .drawer-arrow {
  transform: translateX(6px);
}

.drawer-foot {
  margin: 0 32px 32px;
  padding: 24px;
  border-radius: 20px;
  background: var(--blush);
  font-size: 14px;
  color: var(--ink-soft);
}

.drawer-foot-title {
  font-family: var(--serif);
  font-size: 24px;
  color: var(--ink);
  margin-bottom: 6px;
}

.drawer-cta {
  margin-top: 18px;
}

@keyframes link-in {
  to {
    opacity: 1;
    transform: none;
  }
}

/* Transitions */
.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.45s var(--ease);
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 720px) {
  .book-btn {
    display: none;
  }

  .header.scrolled .header-inner {
    padding: 0 8px 0 18px;
  }

  .drawer-head,
  .drawer-nav {
    padding-left: 24px;
    padding-right: 24px;
  }

  .drawer-foot {
    margin: 0 24px 24px;
  }
}
</style>
