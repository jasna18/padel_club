<script setup lang="ts">
const words = ['Play', 'Train', 'Unwind', 'Recover', 'Connect', 'Compete', 'Celebrate']

// Same scroll speed on every screen: derive the loop duration from the track width
const SPEED = 40 // px per second
const track = ref<HTMLElement | null>(null)
const duration = ref('38s')
let observer: ResizeObserver | null = null

function measure() {
  const half = (track.value?.scrollWidth ?? 0) / 2
  if (half > 0) duration.value = `${(half / SPEED).toFixed(1)}s`
}

onMounted(() => {
  measure()
  observer = new ResizeObserver(measure)
  if (track.value) observer.observe(track.value)
  // Web fonts can change the width after first paint
  document.fonts?.ready.then(measure)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section class="marquee" aria-label="Play, train, unwind, recover, connect, compete, celebrate">
    <!-- The list is rendered twice so the loop is seamless; the copy is hidden from screen readers -->
    <div ref="track" class="track" aria-hidden="true" :style="{ '--dur': duration }">
      <ul v-for="copy in 2" :key="copy" class="group">
        <li v-for="(w, i) in words" :key="w" class="item">
          <span class="word" :class="{ outline: i % 2 === 1 }">{{ w }}</span>
          <svg class="ball" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="8" />
            <path d="M5.6 7.6c3.2 2 3.2 6.8 0 8.8M18.4 7.6c-3.2 2-3.2 6.8 0 8.8" />
          </svg>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.marquee {
  overflow: hidden;
  padding: 24px 0 72px;
  background: transparent;
  /* Words fade in and out at the edges */
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}

.track {
  display: flex;
  width: max-content;
  animation: scroll var(--dur, 38s) linear infinite;
}

/* Pause on hover only with a real mouse; on touch screens a tap leaves a sticky
   :hover that would freeze the marquee */
@media (hover: hover) and (pointer: fine) {
  .marquee:hover .track {
    animation-play-state: paused;
  }
}

.group {
  display: flex;
  flex-shrink: 0;
}

.item {
  display: flex;
  align-items: center;
  gap: clamp(16px, 2vw, 32px);
  padding-right: clamp(16px, 2vw, 32px);
}

.word {
  font-family: var(--serif);
  font-size: clamp(30px, 3.8vw, 56px);
  line-height: 1.1;
  letter-spacing: -0.01em;
  color: var(--ink);
  white-space: nowrap;
}

/* Hollow, transparent letters */
.word.outline {
  font-style: italic;
  color: transparent;
  -webkit-text-stroke: 1px var(--coral);
}

.ball {
  width: clamp(14px, 1.4vw, 20px);
  height: clamp(14px, 1.4vw, 20px);
  flex-shrink: 0;
}

.ball circle {
  fill: var(--coral);
}

.ball path {
  fill: none;
  stroke: #fff;
  stroke-width: 1.5;
  stroke-linecap: round;
}

@keyframes scroll {
  to {
    transform: translateX(-50%);
  }
}

/* Phones on battery saver often report reduced motion: keep the normal speed
   instead of stopping (this overrides the global reduced-motion rule) */
@media (prefers-reduced-motion: reduce) {
  .track {
    animation-duration: var(--dur, 38s) !important;
  }
}

@media (max-width: 600px) {
  .marquee {
    padding: 8px 0 48px;
  }
}
</style>
