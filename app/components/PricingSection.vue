<script setup lang="ts">
const root = ref<HTMLElement | null>(null)
const armed = useReveal(root, 0.15)

// Prices in AED — replace with the club's real rates
const plans = [
  {
    name: 'Court Booking',
    note: 'Per court · 90 minutes · up to 4 players',
    rows: [
      { label: 'Off-peak', detail: 'Weekdays, 7:00 – 16:00', price: '240' },
      { label: 'Peak', detail: 'Evenings & weekends', price: '320' },
      { label: 'Racket rental', detail: 'Per racket', price: '25' }
    ],
    cta: 'Book a Court',
    href: '/book'
  },
  {
    name: 'Membership',
    note: 'Monthly · cancel anytime',
    featured: true,
    from: '450',
    perks: [
      '20% off every court booking',
      'Book 7 days ahead, before the public',
      'Members-only socials & Americanos',
      'Access to the wellness & recovery lounge'
    ],
    cta: 'Become a Member',
    href: '/book?type=membership'
  },
  {
    name: 'Coaching',
    note: 'With certified padel coaches',
    rows: [
      { label: 'Private lesson', detail: '60 minutes', price: '350' },
      { label: 'Semi-private', detail: 'Per person, 2 players', price: '220' },
      { label: 'Group clinic', detail: 'Per person, up to 4', price: '120' }
    ],
    cta: 'Book a Lesson',
    href: '/book?type=coaching'
  }
]
</script>

<template>
  <section id="pricing" ref="root" class="pricing" :class="{ armed }">
    <div class="container">
      <div class="pricing-head" data-reveal>
        <p class="eyebrow pricing-eyebrow">Pricing</p>
        <h2>Simple, <em>transparent</em> rates.</h2>
        <p class="pricing-lead">Play when it suits you, learn from the best, or make Euro Padel your second home.</p>
      </div>

      <div class="pricing-banner" data-reveal>
        <img
          src="/images/pricing-section-1600.webp"
          srcset="/images/pricing-section-900.webp 900w, /images/pricing-section-1600.webp 1600w"
          sizes="(max-width: 1320px) 100vw, 1260px"
          width="1600"
          height="1067"
          loading="lazy"
          alt="The club lounge in the evening, with a doubles match on the glass courts behind"
        />
      </div>

      <ul class="plans" data-reveal>
        <li v-for="(p, i) in plans" :key="p.name" class="plan" :class="{ featured: p.featured }" :style="{ '--i': i }">
          <span v-if="p.featured" class="plan-badge">Best value</span>
          <h3 class="plan-name">{{ p.name }}</h3>
          <p class="plan-note">{{ p.note }}</p>

          <p v-if="p.from" class="plan-from">
            <span class="plan-cur">AED</span>
            <span class="plan-amount">{{ p.from }}</span>
            <span class="plan-per">/ month</span>
          </p>

          <ul v-if="p.rows" class="plan-rows">
            <li v-for="row in p.rows" :key="row.label" class="plan-row">
              <span class="plan-row-text">
                <span class="plan-row-label">{{ row.label }}</span>
                <span class="plan-row-detail">{{ row.detail }}</span>
              </span>
              <span class="plan-row-price"><small>AED</small> {{ row.price }}</span>
            </li>
          </ul>

          <ul v-if="p.perks" class="plan-perks">
            <li v-for="perk in p.perks" :key="perk">{{ perk }}</li>
          </ul>

          <NuxtLink :to="p.href" class="btn plan-cta" :class="{ 'btn-ghost': !p.featured }">
            {{ p.cta }} <span aria-hidden="true">→</span>
          </NuxtLink>
        </li>
      </ul>

      <p class="pricing-foot">All prices in AED and inclusive of VAT.</p>
    </div>
  </section>
</template>

<style scoped>
.pricing {
  padding: 40px 0 120px;
}

.pricing-head {
  max-width: 640px;
  margin: 0 auto 48px;
  text-align: center;
}

.pricing-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 14px;
}

.pricing-eyebrow::before,
.pricing-eyebrow::after {
  content: '';
  width: 32px;
  height: 1px;
  background: currentColor;
  opacity: 0.6;
}

.pricing-head h2 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(28px, 3.4vw, 48px);
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin: 18px 0 16px;
  color: var(--ink);
}

.pricing-head h2 em {
  font-style: italic;
  color: var(--coral);
}

.pricing-lead {
  font-size: 18px;
  line-height: 1.6;
  color: var(--ink-soft);
}

.pricing-banner {
  overflow: hidden;
  border-radius: 28px;
  aspect-ratio: 21 / 8;
  background: var(--blush);
}

.pricing-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 55%;
}

/* Cards overlap the lower edge of the banner */
.plans {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: stretch;
  gap: 24px;
  margin: -150px 32px 0;
}

.plan {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 36px 32px 32px;
  border-radius: 24px;
  background: rgba(252, 249, 245, 0.94);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 30px 60px -24px rgba(38, 48, 58, 0.28);
  transition: opacity 0.9s var(--ease), transform 0.9s var(--ease);
  transition-delay: calc(var(--i) * 0.08s);
}

.plan.featured {
  background: var(--sand);
  border-color: var(--peach);
  box-shadow: 0 34px 70px -24px rgba(232, 130, 106, 0.45);
}

.plan-badge {
  position: absolute;
  top: -13px;
  left: 32px;
  padding: 5px 14px;
  border-radius: 999px;
  background: var(--coral);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.plan-name {
  font-family: var(--serif);
  font-weight: 400;
  font-size: 28px;
  line-height: 1.15;
  color: var(--ink);
}

.plan-note {
  margin-top: 6px;
  font-size: 14px;
  color: var(--ink-soft);
}

.plan-from {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 26px 0 6px;
  color: var(--ink);
}

.plan-cur {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--coral);
}

.plan-amount {
  font-family: var(--serif);
  font-size: 56px;
  line-height: 1;
}

.plan-per {
  font-size: 15px;
  color: var(--ink-soft);
}

.plan-rows,
.plan-perks {
  margin: 24px 0 28px;
  flex: 1;
}

.plan-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
}

.plan-row:first-child {
  border-top: 1px solid var(--line);
}

.plan-row-text {
  display: flex;
  flex-direction: column;
}

.plan-row-label {
  font-size: 16px;
  font-weight: 500;
  color: var(--ink);
}

.plan-row-detail {
  font-size: 13px;
  color: var(--ink-soft);
}

.plan-row-price {
  font-family: var(--serif);
  font-size: 26px;
  line-height: 1;
  color: var(--ink);
  white-space: nowrap;
}

.plan-row-price small {
  font-family: var(--sans);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--coral);
}

.plan-perks {
  margin-top: 18px;
}

.plan-perks li {
  position: relative;
  padding: 10px 0 10px 28px;
  font-size: 16px;
  line-height: 1.45;
  color: var(--ink);
  border-bottom: 1px solid var(--line);
}

.plan-perks li::before {
  content: '';
  position: absolute;
  left: 2px;
  top: 17px;
  width: 12px;
  height: 7px;
  border-left: 1.6px solid var(--coral);
  border-bottom: 1.6px solid var(--coral);
  transform: rotate(-45deg);
}

.plan-cta {
  justify-content: center;
}

.pricing-foot {
  margin-top: 28px;
  text-align: center;
  font-size: 13px;
  color: var(--ink-soft);
}

/* Reveal */
.pricing-head,
.pricing-banner {
  transition: opacity 0.9s var(--ease), transform 0.9s var(--ease);
}

.pricing.armed .pricing-head:not(.in),
.pricing.armed .pricing-banner:not(.in),
.pricing.armed .plans:not(.in) .plan {
  opacity: 0;
  transform: translateY(28px);
}

@media (max-width: 1100px) {
  .plans {
    margin: -110px 16px 0;
    gap: 16px;
  }

  .plan {
    padding: 32px 24px 26px;
  }
}

@media (max-width: 900px) {
  .pricing-banner {
    aspect-ratio: 16 / 9;
  }

  .plans {
    grid-template-columns: 1fr;
    max-width: 520px;
    margin: -64px auto 0;
    gap: 28px;
  }
}

@media (max-width: 600px) {
  .pricing {
    padding: 24px 0 80px;
  }

  .pricing-lead {
    font-size: 17px;
  }

  .pricing-banner {
    aspect-ratio: 4 / 3;
    border-radius: 22px;
  }

  .plans {
    margin: -48px 10px 0;
  }

  .plan-amount {
    font-size: 48px;
  }
}
</style>
