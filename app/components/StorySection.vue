<script setup lang="ts">
const root = ref<HTMLElement | null>(null)
const armed = useReveal(root)

const spaces = [
  { title: 'Academy & Coaching', img: 'academy-coaching-1100.webp', alt: 'A player hitting a forehand on the coral indoor court' },
  { title: 'Social Hub', img: 'social-hub-1100.webp', alt: 'Sage-green club lounge with sofas, a racket emblem on the wall and courts behind the glass' },
  { title: 'Wellness & Recovery', img: 'wellness-recovery-1100.webp', alt: 'Recovery loungers facing a window with the Dubai skyline' },
  { title: 'Tournaments', img: 'tournament-1100.webp', alt: 'Players and spectators on tournament night' }
]
</script>

<template>
  <section id="about" ref="root" class="story" :class="{ armed }">
    <div class="container story-grid" data-reveal>
      <figure class="story-media">
        <img
          src="/images/story-main-960.webp"
          srcset="/images/story-main-960.webp 960w, /images/story-main-1536.webp 1536w"
          sizes="(max-width: 860px) 100vw, 52vw"
          width="1536"
          height="1024"
          loading="lazy"
          alt="The Euro Padel lounge, with branded wall, padel racket and balls, and the courts beyond the glass"
        />
      </figure>

      <div class="story-copy">
        <p class="eyebrow story-eyebrow">Our Story</p>
        <h2>
          More than a court,<br />
          <em>a club.</em>
        </h2>
        <p class="story-text">
          Euro Padel began with a simple idea: give Dubai a place to play padel all year, in comfort.
          Our climate-controlled indoor courts, friendly coaches and lively social calendar bring together
          first-timers, regulars and competitive players — all sharing a love of the rally.
        </p>
        <a href="#contact" class="story-link">
          Visit the club <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>

    <!-- Continuation: a short intro and the four spaces, in one row -->
    <div class="container spaces" data-reveal>
      <div class="spaces-intro">
        <p class="eyebrow">Inside the club</p>
        <h3>Everything under <em>one roof.</em></h3>
        <p>
          From first lessons to finals night, every corner of Euro Padel is designed around the game — and the
          people who play it. Train, unwind, recover and compete, all in one place.
        </p>
      </div>

      <ul class="spaces-list">
        <li v-for="(sp, i) in spaces" :key="sp.title" class="space" :style="{ '--i': i }">
          <div class="space-img">
            <img :src="`/images/${sp.img}`" :alt="sp.alt" loading="lazy" width="1100" height="614" />
          </div>
          <p class="space-title">{{ sp.title }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.story {
  padding: 120px 0;
}

.story-grid {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  align-items: center;
  gap: clamp(40px, 7vw, 112px);
}

.story-media {
  position: relative;
  margin: 0;
}

.story-media img {
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  border-radius: 24px;
  box-shadow: 0 40px 80px -30px rgba(38, 48, 58, 0.25);
}

/* Soft peach block offset behind the photo */
.story-media::before {
  content: '';
  position: absolute;
  inset: 10% -4% -7% 10%;
  z-index: -1;
  border-radius: 24px;
  background: var(--blush);
}

.story-copy {
  max-width: 480px;
}

.story-eyebrow {
  display: flex;
  align-items: center;
  gap: 14px;
}

.story-eyebrow::before {
  content: '';
  width: 32px;
  height: 1px;
  background: currentColor;
  opacity: 0.6;
}

.story-copy h2 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(28px, 3.4vw, 48px);
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin: 20px 0 24px;
  color: var(--ink);
}

.story-copy h2 em {
  font-style: italic;
  color: var(--coral);
}

.story-text {
  font-size: 17px;
  line-height: 1.6;
  color: var(--ink-soft);
}

.story-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 32px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--coral);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink);
  transition: color 0.3s ease;
}

.story-link span {
  color: var(--coral);
  transition: transform 0.3s ease;
}

.story-link:hover {
  color: var(--coral);
}

.story-link:hover span {
  transform: translateX(5px);
}

/* Reveal on scroll (only once JS has armed it) */
.story-media,
.story-copy > * {
  transition: opacity 0.9s var(--ease), transform 0.9s var(--ease);
}

.story.armed .story-grid:not(.in) .story-media,
.story.armed .story-grid:not(.in) .story-copy > *,
.story.armed .spaces:not(.in) .spaces-intro,
.story.armed .spaces:not(.in) .space {
  opacity: 0;
  transform: translateY(28px);
}

/* Four spaces */
.spaces {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  align-items: center;
  gap: clamp(32px, 4vw, 64px);
  margin-top: 110px;
  padding-top: 64px;
  border-top: 1px solid var(--line);
}

.spaces-intro {
  max-width: 500px;
  transition: opacity 0.9s var(--ease), transform 0.9s var(--ease);
}

.spaces-intro h3 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(30px, 3.2vw, 44px);
  line-height: 1.1;
  margin: 18px 0 22px;
  color: var(--ink);
}

.spaces-intro h3 em {
  font-style: italic;
  color: var(--coral);
}

.spaces-intro p:last-child {
  font-size: 19px;
  line-height: 1.6;
  color: var(--ink-soft);
}

.spaces-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px 20px;
}

.space {
  transition: opacity 0.9s var(--ease), transform 0.9s var(--ease);
  transition-delay: calc(0.1s + var(--i) * 0.08s);
}

.space-img {
  overflow: hidden;
  border-radius: 18px;
  aspect-ratio: 4 / 3;
  background: var(--blush);
}

.space-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s var(--ease);
}

.space:hover .space-img img {
  transform: scale(1.06);
}

.space-title {
  margin-top: 14px;
  font-family: var(--serif);
  font-size: 20px;
  line-height: 1.2;
  color: var(--ink);
}


.story-copy > :nth-child(2) { transition-delay: 0.08s; }
.story-copy > :nth-child(3) { transition-delay: 0.16s; }
.story-copy > :nth-child(4) { transition-delay: 0.24s; }

@media (max-width: 860px) {
  .story {
    padding: 80px 0;
  }

  .story-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .story-media {
    margin-right: 4%;
  }

  /* On mobile the story text comes first, then the photo */
  .story-copy {
    order: -1;
    max-width: none;
  }

  .story-text {
    font-size: 16px;
  }
}

@media (max-width: 1000px) {
  .spaces {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .spaces-intro {
    max-width: 600px;
  }
}

@media (max-width: 700px) {
  .spaces {
    margin-top: 72px;
    padding-top: 48px;
  }

  .spaces-list {
    gap: 24px 14px;
  }

  .spaces-intro p:last-child {
    font-size: 17px;
  }

  .space-title {
    font-size: 18px;
  }
}
</style>
