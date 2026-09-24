<template>
  <section class="hero">
    <div class="hero-stage">
      <div class="hero-frame">
        <img
          class="hero-img"
          src="/images/hero-court-1600.webp"
          srcset="
            /images/hero-court-800.webp   800w,
            /images/hero-court-1200.webp 1200w,
            /images/hero-court-1600.webp 1600w,
            /images/hero-court-2000.webp 2000w
          "
          sizes="100vw"
          width="2000"
          height="1333"
          alt="Indoor padel court with a coral surface under a white canopy, city towers beyond the glass"
          fetchpriority="high"
        />
        <div class="hero-wash" aria-hidden="true" />

        <div class="hero-content">
          <p class="eyebrow hero-eyebrow">Indoor Padel</p>
          <h1>
            Play all year,<br />
            <em>in perfect</em> weather.
          </h1>
          <p class="hero-sub">
            Climate-controlled courts, a community that loves a good rally, and coaching for every level.
          </p>
          <div class="hero-ctas">
            <NuxtLink to="/book?type=coaching" class="btn">try a beginner session <span aria-hidden="true">→</span></NuxtLink>
            <a href="#about" class="btn btn-ghost">Explore the Club</a>
          </div>
        </div>

        <ScrollCue />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  background: var(--sand);
  overflow: hidden;
}

/* Starts at the very top so the unscrolled navbar sits on the image */
.hero-stage {
  position: relative;
  height: 100svh;
  min-height: 640px;
  padding-bottom: 16px;
}

.hero-frame {
  position: relative;
  height: 100%;
  border-radius: 0 0 220px 220px;
  overflow: hidden;
  background: var(--blush);
}

.hero-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 70% 60%;
  filter: saturate(0.62) brightness(1.08) contrast(0.92);
  animation: settle 1.6s var(--ease) both;
}

/* Pastel wash: sand glow behind the centered text, court shows through below */
.hero-wash {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 60% at 50% 38%, rgba(246, 240, 233, 0.9) 0%, rgba(246, 240, 233, 0.55) 55%, rgba(246, 240, 233, 0) 100%),
    linear-gradient(180deg, rgba(246, 240, 233, 0.8) 0%, rgba(246, 240, 233, 0.35) 55%, rgba(242, 187, 166, 0.12) 100%);
}

.hero-content {
  position: absolute;
  top: calc(var(--header-h) + 6vh);
  left: 50%;
  width: min(880px, calc(100% - 48px));
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.hero-content > * {
  animation: rise 0.9s var(--ease) both;
}

.hero-content > :nth-child(2) {
  animation-delay: 0.1s;
}

.hero-content > :nth-child(3) {
  animation-delay: 0.2s;
}

.hero-content > :nth-child(4) {
  animation-delay: 0.3s;
}

/* Eyebrow framed by short rules */
.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 14px;
}

.hero-eyebrow::before,
.hero-eyebrow::after {
  content: '';
  width: 32px;
  height: 1px;
  background: currentColor;
  opacity: 0.6;
}

.hero-content h1 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(36px, 5vw, 72px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 22px 0 24px;
  color: var(--ink);
}

.hero-content h1 em {
  font-style: italic;
  color: var(--coral);
}

.hero-sub {
  max-width: 34em;
  font-size: 19px;
  line-height: 1.55;
  color: var(--ink-soft);
}

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
}

@keyframes settle {
  from {
    transform: scale(1.08);
  }
}

@media (max-width: 980px) {
  .hero-frame {
    border-radius: 0 0 140px 140px;
  }
}

@media (max-width: 600px) {
  .hero-stage {
    padding-bottom: 10px;
  }

  .hero-content {
    top: calc(var(--header-h) + 28px);
    width: calc(100% - 40px);
  }

  .hero-sub {
    font-size: 17px;
  }
}

/* Small phones: stack the two buttons at the same width */
@media (max-width: 480px) {
  .hero-ctas {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    max-width: 320px;
  }

  .hero-ctas .btn {
    justify-content: center;
  }
}
</style>
