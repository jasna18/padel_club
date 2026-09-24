<script setup lang="ts">
const words = ['Play', 'Train', 'Unwind', 'Recover', 'Connect', 'Compete', 'Celebrate']
</script>

<template>
  <section class="marquee" aria-label="Play, train, unwind, recover, connect, compete, celebrate">
    <!-- The list is rendered twice so the loop is seamless; the copy is hidden from screen readers -->
    <div class="track" aria-hidden="true">
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
  animation: scroll 38s linear infinite;
}

.marquee:hover .track {
  animation-play-state: paused;
}

.group {
  display: flex;
  flex-shrink: 0;
}

.item {
  display: flex;
  align-items: center;
  gap: clamp(20px, 3vw, 44px);
  padding-right: clamp(20px, 3vw, 44px);
}

.word {
  font-family: var(--serif);
  font-size: clamp(44px, 6.4vw, 96px);
  line-height: 1.1;
  letter-spacing: -0.01em;
  color: var(--ink);
  white-space: nowrap;
}

/* Hollow, transparent letters */
.word.outline {
  font-style: italic;
  color: transparent;
  -webkit-text-stroke: 1.2px var(--coral);
}

.ball {
  width: clamp(18px, 2vw, 28px);
  height: clamp(18px, 2vw, 28px);
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

@media (prefers-reduced-motion: reduce) {
  .track {
    animation: none !important;
  }
}

@media (max-width: 600px) {
  .marquee {
    padding: 8px 0 48px;
  }

  .track {
    animation-duration: 28s;
  }
}
</style>
