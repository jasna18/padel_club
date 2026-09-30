<script setup lang="ts">
// Ring ("coverflow") carousel: photos sit on a circle seen slightly from above.
// The front photo is large and centred, neighbours peek out at the sides and the
// back photo shows small and faded behind. The ring turns one step at a time.
const props = defineProps<{
  spaces: { title: string; img: string; alt: string }[]
}>()

const INTERVAL = 3400 // ms between turns
const TURN_MS = 1100 // duration of one turn

const count = computed(() => props.spaces.length)
const stepDeg = computed(() => 360 / count.value)

const step = ref(0)
const angle = ref(0) // current ring rotation in degrees (animated)
const active = computed(() => ((step.value % count.value) + count.value) % count.value)

// Stage width drives the ring radius and card size
const stage = ref<HTMLElement | null>(null)
const stageW = ref(1100)
const narrow = computed(() => stageW.value < 700)
const cardW = computed(() => (narrow.value ? stageW.value * 0.66 : Math.min(stageW.value * 0.5, 600)))
const cardH = computed(() => cardW.value * 0.62)
const radius = computed(() => stageW.value * (narrow.value ? 0.27 : 0.3))

function cardStyle(i: number) {
  const a = ((i * stepDeg.value + angle.value) * Math.PI) / 180
  const depth = Math.cos(a) // 1 = front, -1 = back
  const t = (depth + 1) / 2 // 0 = back, 1 = front
  const x = Math.sin(a) * radius.value
  const y = -(1 - t) * cardH.value * 0.46 // cards further back sit higher (seen from above)
  const scale = 0.5 + 0.5 * t
  return {
    width: `${cardW.value}px`,
    height: `${cardH.value}px`,
    transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`,
    zIndex: String(Math.round(t * 100)),
    opacity: String(t < 0.5 ? 0.3 + (t / 0.5) * 0.7 : 1),
    filter: `brightness(${0.75 + 0.25 * t})`
  }
}

// Animate the ring along its circle to the target step
let frame = 0
function animateTo(target: number) {
  cancelAnimationFrame(frame)
  const from = angle.value
  const start = performance.now()
  const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
  const run = (now: number) => {
    const p = Math.min((now - start) / TURN_MS, 1)
    angle.value = from + (target - from) * ease(p)
    if (p < 1) frame = requestAnimationFrame(run)
  }
  frame = requestAnimationFrame(run)
}

watch(step, (s) => animateTo(-s * stepDeg.value))

// Auto-turn only while visible and not hovered
const root = ref<HTMLElement | null>(null)
let timer: ReturnType<typeof setInterval> | null = null
let visible = false
let hovered = false
let io: IntersectionObserver | null = null
let ro: ResizeObserver | null = null

function tick() {
  if (visible && !hovered && !document.hidden) step.value++
}

function restart() {
  if (timer) clearInterval(timer)
  timer = setInterval(tick, INTERVAL)
}

function goTo(i: number) {
  let diff = (((i - active.value) % count.value) + count.value) % count.value
  if (diff > count.value / 2) diff -= count.value
  step.value += diff
  restart()
}

onMounted(() => {
  if (stage.value) {
    stageW.value = stage.value.clientWidth
    ro = new ResizeObserver(() => { if (stage.value) stageW.value = stage.value.clientWidth })
    ro.observe(stage.value)
  }
  io = new IntersectionObserver(([e]) => { visible = !!e?.isIntersecting }, { threshold: 0.3 })
  if (root.value) io.observe(root.value)
  restart()
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
  cancelAnimationFrame(frame)
  io?.disconnect()
  ro?.disconnect()
})
</script>

<template>
  <div ref="root" class="carousel" @mouseenter="hovered = true" @mouseleave="hovered = false">
    <div ref="stage" class="stage" :style="{ height: `${cardH * 1.42}px` }">
      <button
        v-for="(sp, i) in spaces"
        :key="sp.title"
        type="button"
        class="card"
        :class="{ front: i === active }"
        :style="cardStyle(i)"
        :aria-label="`Show ${sp.title}`"
        :tabindex="i === active ? -1 : 0"
        @click="goTo(i)"
      >
        <img :src="`/images/${sp.img}`" :alt="sp.alt" loading="lazy" width="1100" height="682" draggable="false" />
      </button>
    </div>

    <div class="caption" aria-live="polite">
      <p class="caption-title">{{ spaces[active]?.title }}</p>
      <div class="dots">
        <button
          v-for="(sp, i) in spaces"
          :key="sp.title"
          type="button"
          class="dot"
          :class="{ on: i === active }"
          :aria-label="`Show ${sp.title}`"
          :aria-pressed="i === active"
          @click="goTo(i)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel {
  width: 100%;
  /* Side cards may extend past narrow screens: clip sideways only, keep shadows */
  overflow-x: clip;
}

.stage {
  position: relative;
  width: 100%;
  min-height: 200px;
}

.card {
  position: absolute;
  top: 62%;
  left: 50%;
  padding: 0;
  border: 0;
  border-radius: 16px;
  overflow: hidden;
  background: var(--blush);
  box-shadow: 0 30px 60px -28px rgba(38, 48, 58, 0.45);
  cursor: pointer;
  will-change: transform, opacity;
}

.card.front {
  cursor: default;
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.caption {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 18px;
}

.caption-title {
  font-family: var(--serif);
  font-size: 26px;
  line-height: 1.2;
  color: var(--ink);
}

.dots {
  display: flex;
  gap: 4px;
}

/* 44px tap target around a small dot */
.dot {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 0;
  background: none;
  cursor: pointer;
}

.dot::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--line);
  transition: background 0.3s ease, transform 0.3s ease;
}

.dot.on::before {
  background: var(--coral);
  transform: scale(1.35);
}

@media (max-width: 700px) {
  .caption-title {
    font-size: 21px;
  }

  .card {
    border-radius: 12px;
  }
}
</style>
