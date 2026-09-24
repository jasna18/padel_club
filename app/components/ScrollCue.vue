<script setup lang="ts">
// 0 = padel ball (top of page), 1 = down arrow (after ~160px of scroll)
const progress = ref(0)
const el = ref<HTMLButtonElement | null>(null)
let frame = 0

function update() {
  frame = 0
  progress.value = Math.min(Math.max(window.scrollY / 160, 0), 1)
}

function onScroll() {
  if (!frame) frame = requestAnimationFrame(update)
}

function scrollPast() {
  const section = el.value?.closest('section')
  if (!section) return
  window.scrollTo({ top: section.getBoundingClientRect().bottom + window.scrollY, behavior: 'smooth' })
}

onMounted(() => {
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  cancelAnimationFrame(frame)
})
</script>

<template>
  <button
    ref="el"
    class="cue"
    type="button"
    aria-label="Scroll down"
    :style="{ '--s': progress }"
    @click="scrollPast"
  >
    <svg class="cue-icon" viewBox="0 0 48 48" aria-hidden="true">
      <g class="cue-ball">
        <circle cx="24" cy="24" r="15.5" />
        <path d="M11.4 15.2c6.6 4.2 6.6 13.4 0 17.6M36.6 15.2c-6.6 4.2-6.6 13.4 0 17.6" />
      </g>
      <g class="cue-arrow">
        <path class="halo" d="M24 13v21" pathLength="1" />
        <path class="halo" d="M17 27l7 7 7-7" pathLength="1" />
        <path d="M24 13v21" pathLength="1" />
        <path d="M17 27l7 7 7-7" pathLength="1" />
      </g>
    </svg>
  </button>
</template>

<style scoped>
.cue {
  /* --s comes from scroll, --h flips to 1 on hover; the icon follows whichever is larger */
  --h: 0;
  --p: max(var(--s, 0), var(--h));
  position: absolute;
  left: 50%;
  bottom: 36px;
  z-index: 2;
  width: 64px;
  height: 64px;
  transform: translateX(-50%);
  display: grid;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  animation: cue-in 0.9s var(--ease) 0.5s both;
}

.cue:hover,
.cue:focus-visible {
  --h: 1;
}

.cue-icon {
  width: 52px;
  height: 52px;
  overflow: visible;
  filter: drop-shadow(0 6px 10px rgba(38, 48, 58, 0.18));
}

.cue-ball,
.cue-arrow {
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.cue-ball {
  opacity: calc(1 - var(--p) * 1.6);
  transform: rotate(calc(var(--p) * 220deg)) scale(calc(1 - var(--p) * 0.6));
}

.cue-ball circle {
  fill: #e8836a;
}

.cue-ball path {
  fill: none;
  stroke: #fff;
  stroke-width: 1.8;
  stroke-linecap: round;
}

.cue-arrow {
  opacity: calc(var(--p) * 1.6 - 0.4);
  transform: translateY(calc((1 - var(--p)) * -6px));
}

.cue-arrow path {
  fill: none;
  stroke: #e8836a;
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: calc(1 - var(--p));
  transition: stroke-dashoffset 0.25s ease;
}

/* White outline under the arrow so it reads on the coral court */
.cue-arrow path.halo {
  stroke: #fff;
  stroke-width: 5.5;
  opacity: 0.9;
}

@keyframes cue-in {
  from {
    opacity: 0;
    transform: translate(-50%, 12px);
  }
}

@media (max-width: 600px) {
  .cue {
    bottom: 28px;
  }

  .cue-icon {
    width: 46px;
    height: 46px;
  }
}
</style>
