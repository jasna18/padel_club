/** Club details from app.config plus ready-made contact links. */
export function useClub() {
  const { club } = useAppConfig()

  const whatsappUrl = (message?: string) =>
    `https://wa.me/${club.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`

  return {
    club,
    whatsappUrl,
    phoneUrl: `tel:${club.phoneHref}`,
    emailUrl: `mailto:${club.email}`
  }
}
