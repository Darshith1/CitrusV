/** Site-wide contact, booking & social config */

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "citrusvison@gmail.com";

/** Google Calendar Appointment schedule (auto-adds Google Meet). */
export const GOOGLE_APPOINTMENTS_URL =
  process.env.NEXT_PUBLIC_GOOGLE_APPOINTMENTS_URL?.trim() || "";

export const LINKEDIN_URL =
  process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/";

export function bookCallMailto(subject = "Book a CitrusV strategy call") {
  const body = [
    "Hi CitrusV,",
    "",
    "I'd like to book a 30–45 minute Google Meet strategy call.",
    "",
    "Preferred dates/times (with timezone):",
    "1.",
    "2.",
    "3.",
    "",
    "Briefly, what we're hoping to discuss:",
    "",
  ].join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Primary CTA target: live Google scheduler when configured, else /book. */
export function bookCallHref() {
  return GOOGLE_APPOINTMENTS_URL || "/book";
}

export function bookCallIsExternal() {
  return Boolean(GOOGLE_APPOINTMENTS_URL);
}

/** Embeddable appointments URL (`gv=true` for Google’s booking UI). */
export function googleAppointmentsEmbedUrl() {
  if (!GOOGLE_APPOINTMENTS_URL) return "";
  try {
    const url = new URL(GOOGLE_APPOINTMENTS_URL);
    url.searchParams.set("gv", "true");
    return url.toString();
  } catch {
    return GOOGLE_APPOINTMENTS_URL;
  }
}
