<script setup lang="ts">
const { club } = useAppConfig()
const href = `https://wa.me/${club.whatsapp}?text=${encodeURIComponent('Hi Euro Padel, I would like to know more about booking a court.')}`
</script>

<template>
  <a :href="href" class="wa" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">
    <span class="wa-label">Chat with us</span>
    <span class="wa-icon">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          class="wa-bubble"
          d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2Z"
        />
        <path
          class="wa-phone"
          d="M9.1 7.7c.2-.5.5-.5.8-.5h.6c.2 0 .4 0 .6.5l.7 1.7c.1.2.1.4 0 .6l-.5.7c-.1.2-.1.4 0 .5.6 1.1 1.5 2 2.6 2.6.2.1.4.1.5 0l.7-.6c.2-.1.4-.2.6-.1l1.7.8c.3.1.4.3.4.5v.6c0 .4-.1.7-.6.9-1.4.6-3.6-.1-5.3-1.8S8.6 9.2 9.1 7.7Z"
        />
      </svg>
    </span>
  </a>
</template>

<style scoped>
.wa {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 90;
  display: flex;
  align-items: center;
  gap: 10px;
  animation: wa-in 0.8s var(--ease) 1.2s both;
}

.wa-icon {
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: var(--olive);
  box-shadow: 0 14px 34px -8px rgba(38, 48, 58, 0.4), 0 0 0 6px rgba(99, 107, 47, 0.14);
  transition: transform 0.35s var(--ease), background 0.3s ease;
}

.wa-icon svg {
  width: 28px;
  height: 28px;
}

.wa-bubble {
  fill: none;
  stroke: #f3eee4;
  stroke-width: 1.6;
  stroke-linejoin: round;
}

.wa-phone {
  fill: #f3eee4;
}

/* Label slides out on hover (desktop) */
.wa-label {
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(252, 249, 245, 0.95);
  box-shadow: 0 10px 26px -10px rgba(38, 48, 58, 0.35);
  font-size: 14px;
  font-weight: 600;
  color: var(--ink);
  white-space: nowrap;
  opacity: 0;
  transform: translateX(10px);
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.35s var(--ease);
}

.wa:hover .wa-label,
.wa:focus-visible .wa-label {
  opacity: 1;
  transform: none;
}

.wa:hover .wa-icon {
  transform: scale(1.06);
  background: #545b27;
}

@keyframes wa-in {
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.9);
  }
}

@media (max-width: 600px) {
  .wa {
    right: 16px;
    bottom: 16px;
  }

  .wa-icon {
    width: 54px;
    height: 54px;
  }

  .wa-label {
    display: none;
  }
}
</style>
