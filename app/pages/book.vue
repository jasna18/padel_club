<script setup lang="ts">
useSeoMeta({
  title: 'Book a Court — Euro Padel, Dubai',
  description: 'Request a court, a coaching session or a membership at Euro Padel, the indoor padel club in Dubai.'
})

const { club } = useAppConfig()
const route = useRoute()

const types = [
  { value: 'court', label: 'Court booking' },
  { value: 'coaching', label: 'Coaching' },
  { value: 'membership', label: 'Membership' },
  { value: 'event', label: 'Private event' }
] as const
type RequestType = (typeof types)[number]['value']

const initialType = types.some((t) => t.value === route.query.type) ? (route.query.type as RequestType) : 'court'

const form = reactive({
  type: initialType,
  name: '',
  phone: '',
  email: '',
  date: '',
  time: '18:00',
  duration: '90',
  players: '4',
  message: ''
})

const needsSlot = computed(() => form.type === 'court' || form.type === 'coaching')
const times = Array.from({ length: 17 }, (_, i) => `${String(i + 7).padStart(2, '0')}:00`)

// Earliest selectable date is today (computed in the browser)
const today = ref('')
onMounted(() => {
  today.value = new Date().toISOString().slice(0, 10)
})

const status = ref<'idle' | 'sending' | 'sent' | 'mailed' | 'error'>('idle')

function summary() {
  const type = types.find((t) => t.value === form.type)?.label ?? form.type
  const lines = [
    `Request: ${type}`,
    `Name: ${form.name}`,
    `Phone: ${form.phone}`,
    `Email: ${form.email}`
  ]
  if (needsSlot.value) {
    lines.push(`Date: ${form.date}`, `Time: ${form.time}`, `Duration: ${form.duration} min`, `Players: ${form.players}`)
  }
  if (form.message) lines.push('', form.message)
  return { type, body: lines.join('\n') }
}

async function submit() {
  const { type, body } = summary()

  // No form service configured: hand the request to the visitor's email app
  if (!club.bookingEndpoint) {
    const subject = encodeURIComponent(`${type} request — ${form.name}`)
    window.location.href = `mailto:${club.email}?subject=${subject}&body=${encodeURIComponent(body)}`
    status.value = 'mailed'
    return
  }

  status.value = 'sending'
  try {
    await $fetch(club.bookingEndpoint, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: { ...form, request: type, _subject: `${type} request — ${form.name}` }
    })
    status.value = 'sent'
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <section class="book">
    <div class="book-grid">
      <aside class="book-visual">
        <img
          src="/images/story-main-960.webp"
          srcset="/images/story-main-960.webp 960w, /images/story-main-1536.webp 1536w"
          sizes="(max-width: 960px) 100vw, 42vw"
          width="1536"
          height="1024"
          alt="The Euro Padel lounge with the courts beyond the glass"
        />
        <div class="book-visual-card">
          <p class="eyebrow">Prefer to talk?</p>
          <a :href="`https://wa.me/${club.whatsapp}`" target="_blank" rel="noopener" class="visual-link">
            WhatsApp us <span aria-hidden="true">→</span>
          </a>
          <a :href="`tel:${club.phoneHref}`" class="visual-link">{{ club.phone }}</a>
        </div>
      </aside>

      <div class="book-main">
        <p class="eyebrow book-eyebrow">Reservations</p>
        <h1>Book your <em>court.</em></h1>
        <p class="book-lead">Tell us when you'd like to play and we'll confirm your booking by phone or email.</p>

        <div v-if="status === 'sent' || status === 'mailed'" class="book-done" role="status">
          <p class="done-title">Thank you, {{ form.name.split(' ')[0] || 'friend' }}.</p>
          <p v-if="status === 'sent'">Your request is with us. We'll be in touch shortly to confirm.</p>
          <p v-else>
            Your email app should now be open with your request filled in — just press send. If nothing opened, email us at
            <a :href="`mailto:${club.email}`">{{ club.email }}</a>.
          </p>
          <NuxtLink to="/" class="book-back">Back to home <span aria-hidden="true">→</span></NuxtLink>
        </div>

        <form v-else class="book-form" @submit.prevent="submit">
          <fieldset class="types">
            <legend class="field-label">I'd like to book</legend>
            <label v-for="t in types" :key="t.value" class="type-chip">
              <input v-model="form.type" type="radio" name="type" :value="t.value" />
              <span>{{ t.label }}</span>
            </label>
          </fieldset>

          <div class="fields">
            <label class="field">
              <span class="field-label">Full name</span>
              <input v-model.trim="form.name" type="text" name="name" autocomplete="name" required />
            </label>
            <label class="field">
              <span class="field-label">Phone</span>
              <input v-model.trim="form.phone" type="tel" name="phone" autocomplete="tel" placeholder="+971" required />
            </label>
            <label class="field field-wide">
              <span class="field-label">Email</span>
              <input v-model.trim="form.email" type="email" name="email" autocomplete="email" required />
            </label>

            <template v-if="needsSlot">
              <label class="field">
                <span class="field-label">Date</span>
                <input v-model="form.date" type="date" name="date" :min="today" required />
              </label>
              <label class="field">
                <span class="field-label">Start time</span>
                <select v-model="form.time" name="time">
                  <option v-for="t in times" :key="t" :value="t">{{ t }}</option>
                </select>
              </label>
              <label class="field">
                <span class="field-label">Duration</span>
                <select v-model="form.duration" name="duration">
                  <option value="60">60 minutes</option>
                  <option value="90">90 minutes</option>
                  <option value="120">120 minutes</option>
                </select>
              </label>
              <label class="field">
                <span class="field-label">Players</span>
                <select v-model="form.players" name="players">
                  <option value="1">1 player</option>
                  <option value="2">2 players</option>
                  <option value="3">3 players</option>
                  <option value="4">4 players</option>
                </select>
              </label>
            </template>

            <label class="field field-wide">
              <span class="field-label">Anything we should know? <em>(optional)</em></span>
              <textarea v-model.trim="form.message" name="message" rows="3" />
            </label>
          </div>

          <p v-if="status === 'error'" class="book-error" role="alert">
            Something went wrong sending your request. Please try again, or WhatsApp us.
          </p>

          <div class="book-actions">
            <button type="submit" class="btn" :disabled="status === 'sending'">
              {{ status === 'sending' ? 'Sending…' : 'Request booking' }} <span aria-hidden="true">→</span>
            </button>
            <p class="book-note">No payment needed now.</p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.book {
  padding: calc(var(--header-h) + 24px) 16px 96px;
}

.book-grid {
  display: grid;
  grid-template-columns: 0.85fr 1fr;
  gap: clamp(40px, 6vw, 96px);
  max-width: 1320px;
  margin: 0 auto;
}

/* Photo panel stays in view while the form scrolls */
.book-visual {
  position: sticky;
  top: calc(var(--header-h) + 16px);
  align-self: start;
  height: calc(100svh - var(--header-h) - 40px);
  min-height: 520px;
  border-radius: 32px;
  overflow: hidden;
}

.book-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.book-visual-card {
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 24px;
  padding: 18px 22px;
  border-radius: 20px;
  background: rgba(246, 240, 233, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.book-visual-card .eyebrow {
  width: 100%;
}

.visual-link {
  font-size: 15px;
  font-weight: 600;
  color: var(--ink);
  transition: color 0.25s ease;
}

.visual-link:hover {
  color: var(--coral);
}

.book-main {
  padding-top: 24px;
  max-width: 620px;
}

.book-eyebrow {
  display: flex;
  align-items: center;
  gap: 14px;
}

.book-eyebrow::before {
  content: '';
  width: 32px;
  height: 1px;
  background: currentColor;
  opacity: 0.6;
}

.book-main h1 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(40px, 5vw, 72px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 18px 0 16px;
}

.book-main h1 em {
  font-style: italic;
  color: var(--coral);
}

.book-lead {
  max-width: 34em;
  font-size: 18px;
  line-height: 1.6;
  color: var(--ink-soft);
}

.book-form {
  margin-top: 44px;
}

/* Request type as pill chips */
.types {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  border: 0;
  margin-bottom: 36px;
}

.types legend {
  margin-bottom: 14px;
}

.type-chip input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.type-chip span {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 20px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.5);
  font-size: 15px;
  color: var(--ink);
  cursor: pointer;
  transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
}

.type-chip:hover span {
  border-color: var(--peach);
}

.type-chip input:checked + span {
  background: var(--ink);
  border-color: var(--ink);
  color: #fff;
}

.type-chip input:focus-visible + span {
  outline: 2px solid var(--coral);
  outline-offset: 3px;
}

.fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px 32px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-wide {
  grid-column: 1 / -1;
}

.field-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.field-label em {
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.04em;
  text-transform: none;
}

/* Underline-only inputs */
.field input,
.field select,
.field textarea {
  width: 100%;
  min-height: 48px;
  padding: 10px 0;
  border: 0;
  border-bottom: 1px solid #d8c9ba;
  border-radius: 0;
  background: transparent;
  font: inherit;
  font-size: 17px;
  color: var(--ink);
  transition: border-color 0.25s ease;
  appearance: none;
  -webkit-appearance: none;
}

.field select {
  cursor: pointer;
  background-image: linear-gradient(45deg, transparent 50%, var(--ink-soft) 50%),
    linear-gradient(135deg, var(--ink-soft) 50%, transparent 50%);
  background-position: calc(100% - 10px) 55%, calc(100% - 5px) 55%;
  background-size: 5px 5px;
  background-repeat: no-repeat;
}

.field textarea {
  resize: vertical;
  min-height: 96px;
}

.field input::placeholder {
  color: #b9ab9d;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-bottom-color: var(--coral);
}

.field input:user-invalid {
  border-bottom-color: var(--coral-deep);
}

.book-error {
  margin-top: 24px;
  font-size: 15px;
  color: var(--coral-deep);
}

.book-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 24px;
  margin-top: 40px;
}

.book-actions .btn:disabled {
  opacity: 0.7;
  cursor: wait;
}

.book-note {
  font-size: 14px;
  color: var(--ink-soft);
}

/* Confirmation */
.book-done {
  margin-top: 44px;
  padding: 36px;
  border-radius: 24px;
  background: var(--blush);
  font-size: 17px;
  line-height: 1.6;
  color: var(--ink-soft);
}

.book-done a {
  color: var(--ink);
  text-decoration: underline;
}

.done-title {
  margin-bottom: 8px;
  font-family: var(--serif);
  font-size: 32px;
  color: var(--ink);
}

.book-back {
  display: inline-flex;
  gap: 10px;
  margin-top: 20px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-decoration: none !important;
}

@media (max-width: 960px) {
  .book-grid {
    grid-template-columns: 1fr;
  }

  .book-visual {
    position: relative;
    top: 0;
    height: auto;
    min-height: 0;
    aspect-ratio: 16 / 10;
  }

  .book-main {
    max-width: none;
    padding-top: 0;
  }
}

@media (max-width: 560px) {
  .book {
    padding-bottom: 72px;
  }

  .book-visual {
    border-radius: 24px;
    aspect-ratio: 4 / 3;
  }

  .book-visual-card {
    left: 12px;
    right: 12px;
    bottom: 12px;
    padding: 14px 16px;
  }

  .fields {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
