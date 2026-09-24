<script setup lang="ts">
const root = ref<HTMLElement | null>(null)
const armed = useReveal(root, 0.15)

const events = [
  { title: 'Americano Nights', detail: 'Social rotations for every level, every week' },
  { title: 'Leagues & Tournaments', detail: 'Monthly ladders, finals nights and prizes' },
  { title: 'Corporate Padel Days', detail: 'Team building with coaching and catering' },
  { title: 'Private Celebrations', detail: 'Birthdays, launches and private hire' }
]
</script>

<template>
  <section id="events" ref="root" class="events" :class="{ armed }">
    <div class="container events-grid">
      <div class="events-copy" data-reveal>
        <p class="eyebrow events-eyebrow">Events</p>
        <h2>Where the club <em>comes together.</em></h2>
        <p class="events-text">
          From Thursday Americanos to finals night under the lights, our calendar is full of reasons to stay a little
          longer. Host your team, celebrate a milestone, or simply come and meet your next doubles partner.
        </p>

        <ul class="events-list">
          <li v-for="(e, i) in events" :key="e.title" class="event" :style="{ '--i': i }">
            <span class="event-title">{{ e.title }}</span>
            <span class="event-detail">{{ e.detail }}</span>
          </li>
        </ul>

        <NuxtLink to="/book?type=event" class="btn events-cta">
          Plan your event <span aria-hidden="true">→</span>
        </NuxtLink>
      </div>

      <figure class="events-media" data-reveal>
        <img
          src="/images/events-section-900.webp"
          srcset="/images/events-section-900.webp 900w, /images/events-section-1536.webp 1536w"
          sizes="(max-width: 960px) 100vw, 55vw"
          width="1536"
          height="1024"
          loading="lazy"
          alt="An evening talk in the club lounge, with guests on the sofas and a match on the courts behind"
        />
        <figcaption class="events-badge">Play · Connect · Belong</figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.events {
  padding: 32px 0 112px;
}

.events-grid {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  align-items: center;
  gap: clamp(40px, 6vw, 96px);
}

.events-copy {
  max-width: 520px;
}

.events-eyebrow {
  display: flex;
  align-items: center;
  gap: 14px;
}

.events-eyebrow::before {
  content: '';
  width: 32px;
  height: 1px;
  background: currentColor;
  opacity: 0.6;
}

.events-copy h2 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(28px, 3.4vw, 48px);
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin: 20px 0 22px;
  color: var(--ink);
}

.events-copy h2 em {
  font-style: italic;
  color: var(--coral);
}

.events-text {
  font-size: 17px;
  line-height: 1.6;
  color: var(--ink-soft);
}

.events-list {
  margin: 32px 0 36px;
  border-top: 1px solid var(--line);
}

.event {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px 24px;
  flex-wrap: wrap;
  padding: 16px 0;
  border-bottom: 1px solid var(--line);
}

.event-title {
  font-family: var(--serif);
  font-size: 22px;
  line-height: 1.2;
  color: var(--ink);
}

.event-detail {
  font-size: 14px;
  color: var(--ink-soft);
}

.events-media {
  position: relative;
  margin: 0;
}

.events-media img {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 28px;
  box-shadow: 0 40px 80px -30px rgba(38, 48, 58, 0.3);
}

/* Soft sage block offset behind the photo, echoing the lounge */
.events-media::before {
  content: '';
  position: absolute;
  inset: -6% 8% 12% -5%;
  z-index: -1;
  border-radius: 28px;
  background: rgba(99, 107, 47, 0.12);
}

.events-badge {
  position: absolute;
  left: 24px;
  bottom: 24px;
  padding: 10px 18px;
  border-radius: 999px;
  background: rgba(246, 240, 233, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--olive);
}

/* Reveal */
.events-copy,
.events-media {
  transition: opacity 0.9s var(--ease), transform 0.9s var(--ease);
}

.events-media {
  transition-delay: 0.12s;
}

.events.armed .events-copy:not(.in),
.events.armed .events-media:not(.in) {
  opacity: 0;
  transform: translateY(28px);
}

@media (max-width: 960px) {
  .events {
    padding: 16px 0 80px;
  }

  .events-grid {
    grid-template-columns: 1fr;
    gap: 44px;
  }

  .events-copy {
    max-width: none;
  }

  .events-media {
    margin-left: 4%;
  }
}

@media (max-width: 560px) {
  .events-text {
    font-size: 16px;
  }

  .event {
    flex-direction: column;
    gap: 4px;
  }

  .event-title {
    font-size: 20px;
  }

  .events-media img {
    border-radius: 22px;
  }

  .events-badge {
    left: 14px;
    bottom: 14px;
    font-size: 11px;
  }
}
</style>
