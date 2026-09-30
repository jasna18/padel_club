// Club details, used by the header sidebar, footer, booking page and WhatsApp button
// (read them through useClub()). Replace the placeholders before going live.
export default defineAppConfig({
  club: {
    phone: '+971 00 000 0000',
    phoneHref: '+971000000000',
    // International format, digits only (used for wa.me links)
    whatsapp: '971000000000',
    email: 'hello@europadel.ae',
    location: 'DIP, Dubai',
    country: 'United Arab Emirates',
    hours: '7:00 – 24:00',
    // Optional form endpoint (e.g. a Formspree URL). When empty, booking requests
    // open the visitor's email app pre-filled and addressed to `email`.
    bookingEndpoint: ''
  }
})
