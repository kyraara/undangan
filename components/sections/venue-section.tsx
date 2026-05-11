import { MapPin, Navigation } from "lucide-react"
import { weddingConfig } from "@/lib/config"
import { AnimatedReveal } from "@/components/ui/animated-reveal"
import { SectionTitle } from "@/components/ui/section-title"

export function VenueSection() {
  const venue = weddingConfig.events[1] // resepsi as primary venue

  return (
    <section
      id="venue"
      className="relative overflow-hidden bg-[var(--color-bg-card)] px-6 py-24 sm:py-28"
    >
      <div className="relative mx-auto max-w-5xl">
        <AnimatedReveal>
          <SectionTitle
            eyebrow="Lokasi"
            title="Temukan Kami"
            description="Acara akan diselenggarakan di lokasi berikut. Tekan tombol di bawah untuk petunjuk arah."
          />
        </AnimatedReveal>

        <AnimatedReveal variant="fadeUp" delay={150}>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-10">
            <div className="md:col-span-2">
              <div className="rounded-3xl border border-[var(--color-gold)]/30 bg-[var(--color-bg-primary)]/60 p-8">
                <p className="font-display text-3xl text-[var(--color-gold)]">
                  Welcome
                </p>
                <h3 className="mt-1 font-heading text-2xl font-semibold text-[var(--color-bg-dark)] sm:text-3xl">
                  {venue.venue}
                </h3>
                <div className="my-5 h-px w-12 bg-[var(--color-gold)]/60" />
                <div className="flex items-start gap-3 text-[var(--color-text-primary)]">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-[var(--color-gold)]" />
                  <p className="leading-relaxed">{venue.address}</p>
                </div>
                <a
                  href={venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-bg-dark)] px-6 py-2.5 text-sm font-medium tracking-wide text-[var(--color-text-light)] transition hover:bg-[var(--color-gold)] hover:text-[var(--color-bg-dark)]"
                >
                  <Navigation className="h-4 w-4" />
                  Petunjuk Arah
                </a>
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="relative overflow-hidden rounded-3xl border border-[var(--color-gold)]/30 shadow-card">
                <iframe
                  title={`Peta lokasi ${venue.venue}`}
                  src="https://www.google.com/maps?q=Jakarta&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[320px] w-full sm:h-[420px]"
                  style={{ border: 0, filter: "saturate(0.85)" }}
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  )
}
