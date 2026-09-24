// Club contact details, used by the footer, booking page and WhatsApp button.
// Replace the placeholders with the real details before going live.
export default defineAppConfig({
  club: {
    phone: '+971 00 000 0000',
    phoneHref: '+971000000000',
    // International format, digits only (used for wa.me links)
    whatsapp: '971000000000',
    email: 'hello@europadel.ae',
    // Optional form endpoint (e.g. a Formspree URL). When empty, booking requests
    // open the visitor's email app pre-filled and addressed to `email`.
    bookingEndpoint: ''
  }
})
