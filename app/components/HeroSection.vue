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
          <p class="eyebrow">Indoor Padel</p>
          <h1>
            Play all year,<br />
            <em>in perfect</em> weather.
          </h1>
          <p class="hero-sub">
            Climate-controlled courts, a community that loves a good rally, and coaching for every level.
          </p>
          <div class="hero-ctas">
            <a href="#book" class="btn">click for a free session <span aria-hidden="true">→</span></a>
            <a href="#about" class="btn btn-ghost">Explore the Club</a>
          </div>
        </div>
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
  border-radius: 0 0 220px 40px;
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

/* Pastel wash: sand on the text side, soft peach toward the image */
.hero-wash {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(246, 240, 233, 0.7) 0%, rgba(246, 240, 233, 0) 22%),
    linear-gradient(95deg, rgba(246, 240, 233, 0.96) 0%, rgba(246, 240, 233, 0.86) 30%, rgba(246, 240, 233, 0.2) 62%, rgba(242, 187, 166, 0.18) 100%),
    linear-gradient(0deg, rgba(236, 214, 199, 0.35), rgba(236, 214, 199, 0) 45%);
}

.hero-content {
  position: absolute;
  top: 50%;
  left: clamp(24px, 6vw, 96px);
  transform: translateY(-50%);
  max-width: 560px;
  animation: rise 1s var(--ease) 0.15s both;
}

.hero-content h1 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(46px, 6.4vw, 96px);
  line-height: 0.98;
  letter-spacing: -0.01em;
  margin: 20px 0 22px;
  color: var(--ink);
}

.hero-content h1 em {
  font-style: italic;
  color: var(--coral);
}

.hero-sub {
  max-width: 420px;
  font-size: 16.5px;
  color: var(--ink-soft);
}

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(calc(-50% + 24px));
  }
}

@keyframes rise-plain {
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
    border-radius: 0 0 140px 32px;
  }

  .hero-wash {
    background: linear-gradient(180deg, rgba(246, 240, 233, 0.94) 0%, rgba(246, 240, 233, 0.82) 50%, rgba(246, 240, 233, 0.25) 100%);
  }

  .hero-content {
    top: calc(var(--header-h) + 40px);
    transform: none;
    animation-name: rise-plain;
  }
}

@media (max-width: 600px) {
  .hero-stage {
    padding-bottom: 10px;
  }

  .hero-content {
    left: 22px;
    right: 22px;
    top: calc(var(--header-h) + 24px);
  }

  .hero-sub {
    font-size: 15px;
  }
}
</style>
