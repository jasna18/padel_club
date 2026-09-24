<script setup lang="ts">
const { club } = useAppConfig()
const year = new Date().getFullYear()

const explore = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/#about' },
  { label: 'Pricing', to: '/#pricing' },
  { label: 'Book a Court', to: '/book' }
]
</script>

<template>
  <footer id="contact" class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <NuxtLink to="/" class="brand" aria-label="Euro Padel home">
            <svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <circle cx="16" cy="16" r="13" />
              <path d="M3 16h26M16 3c-4 4-4 22 0 26" />
            </svg>
            <span>Euro Padel</span>
          </NuxtLink>
          <p class="footer-tagline">Indoor padel, all year round. Courts, coaching and community in the heart of Dubai.</p>
          <NuxtLink to="/book" class="footer-cta">Book a Court <span aria-hidden="true">→</span></NuxtLink>
        </div>

        <nav class="footer-col" aria-label="Footer">
          <p class="footer-title">Explore</p>
          <NuxtLink v-for="l in explore" :key="l.label" :to="l.to" class="footer-link">{{ l.label }}</NuxtLink>
        </nav>

        <div class="footer-col">
          <p class="footer-title">Visit</p>
          <p>DIP, Dubai</p>
          <p>United Arab Emirates</p>
          <p class="footer-gap">Open daily</p>
          <p>7:00 – 24:00</p>
        </div>

        <div class="footer-col">
          <p class="footer-title">Contact</p>
          <a :href="`tel:${club.phoneHref}`" class="footer-link">{{ club.phone }}</a>
          <a :href="`mailto:${club.email}`" class="footer-link">{{ club.email }}</a>
          <div class="footer-social">
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r=".9" class="dot" />
              </svg>
            </a>
            <a :href="`https://wa.me/${club.whatsapp}`" target="_blank" rel="noopener" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 20l1.2-3.6A8 8 0 1 1 8 19.1L4 20Z" />
                <path d="M9.2 8.6c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.6 1.5c.1.2 0 .4-.1.6l-.5.6c.6 1.1 1.4 1.9 2.5 2.5l.6-.5c.2-.1.4-.2.6-.1l1.5.6c.3.1.4.3.4.5v.5c0 .3 0 .6-.5.8-1.3.6-3.5-.1-5-1.6s-2.3-3.7-1.9-5.1Z" class="dot" />
              </svg>
            </a>
            <a href="#" aria-label="TikTok">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M13.5 4v10.5a3 3 0 1 1-3-3M13.5 4c.4 2.3 2 3.8 4.5 4" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <p class="footer-wordmark" aria-hidden="true">Euro <em>Padel</em></p>

      <div class="footer-bottom">
        <p>© {{ year }} Euro Padel. All rights reserved.</p>
        <div class="footer-legal">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  --on-olive: var(--ink);
  --on-olive-dim: var(--ink-soft);
  --on-olive-line: rgba(99, 107, 47, 0.2);
  background: linear-gradient(180deg, rgba(99, 107, 47, 0.06) 0%, rgba(99, 107, 47, 0.16) 100%), var(--sand);
  border-top: 1px solid rgba(99, 107, 47, 0.12);
  color: var(--on-olive);
  border-radius: 40px 40px 0 0;
  padding: 88px 0 32px;
  overflow: hidden;
}

.footer-top {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1.2fr;
  gap: 48px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--olive);
}

.brand span {
  color: var(--on-olive);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.footer-tagline {
  max-width: 320px;
  margin: 22px 0 28px;
  font-size: 16px;
  line-height: 1.6;
  color: var(--on-olive-dim);
}

.footer-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 48px;
  padding: 0 26px;
  border-radius: 999px;
  background: var(--olive);
  color: #f6f0e9;
  font-size: 15px;
  font-weight: 600;
  transition: background 0.3s ease, color 0.3s ease;
}

.footer-cta:hover {
  background: #545b27;
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 15px;
  color: var(--on-olive-dim);
}

.footer-title {
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--olive);
}

.footer-gap {
  margin-top: 12px;
}

.footer-link {
  width: fit-content;
  color: var(--on-olive);
  transition: color 0.25s ease;
}

.footer-link:hover {
  color: var(--olive);
}

.footer-social {
  display: flex;
  gap: 10px;
  margin-top: 16px;
}

.footer-social a {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--on-olive-line);
  transition: background 0.3s ease, border-color 0.3s ease;
}

.footer-social a:hover {
  background: var(--olive);
  border-color: var(--olive);
}

.footer-social svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: var(--olive);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: stroke 0.3s ease;
}

.footer-social svg .dot {
  fill: var(--olive);
  stroke: none;
  transition: fill 0.3s ease;
}

.footer-social a:hover svg {
  stroke: #f6f0e9;
}

.footer-social a:hover svg .dot {
  fill: #f6f0e9;
}

/* Oversized wordmark across the bottom */
.footer-wordmark {
  margin: 72px 0 8px;
  font-family: var(--serif);
  font-size: clamp(64px, 15vw, 220px);
  line-height: 0.9;
  letter-spacing: -0.02em;
  white-space: nowrap;
  text-align: center;
  color: rgba(99, 107, 47, 0.12);
}

.footer-wordmark em {
  font-style: italic;
  color: rgba(232, 130, 106, 0.22);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid var(--on-olive-line);
  font-size: 13px;
  color: var(--on-olive-dim);
}

.footer-legal {
  display: flex;
  gap: 24px;
}

.footer-legal a:hover {
  color: var(--olive);
}

@media (max-width: 980px) {
  .footer-top {
    grid-template-columns: 1fr 1fr;
    gap: 40px 32px;
  }

  .footer-brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 560px) {
  .footer {
    border-radius: 28px 28px 0 0;
    padding: 64px 0 28px;
  }

  .footer-top {
    grid-template-columns: 1fr;
  }

  .footer-wordmark {
    margin-top: 56px;
  }

  .footer-bottom {
    flex-direction: column;
  }
}
</style>
