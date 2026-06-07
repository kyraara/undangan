"use client"

import { MapPin, Navigation } from "lucide-react"
import { useConfig } from "@/lib/config-context"
import { AnimatedReveal } from "@/components/ui/animated-reveal"
import { SectionTitle } from "@/components/ui/section-title"

export function VenueSection() {
  const { events } = useConfig()
  const venue = events[1]

  return (
    <section
      id="venue"
      className="relative overflow-hidden bg-(--color-bg-card) px-6 py-24 sm:py-28"
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
              <div className="rounded-3xl border border-(--color-gold)/30 bg-(--color-bg-primary)/60 p-8">
                <p className="font-display text-3xl text-(--color-gold)">
                  Welcome
                </p>
                <h3 className="mt-1 font-heading text-2xl font-semibold text-(--color-text-primary) sm:text-3xl">
                  {venue.venue}
                </h3>
                <div className="my-5 h-px w-12 bg-(--color-gold)/60" />
                <div className="flex items-start gap-3 text-(--color-text-primary)">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-(--color-gold)" />
                  <p className="leading-relaxed">{venue.address}</p>
                </div>
                <a
                  href={venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-(--color-bg-dark) px-6 py-2.5 text-sm font-medium tracking-wide text-(--color-text-light) transition hover:bg-(--color-gold) hover:text-(--color-bg-dark)"
                >
                  <Navigation className="h-4 w-4" />
                  Petunjuk Arah
                </a>
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="relative overflow-hidden rounded-3xl border border-(--color-gold)/30 shadow-card">
                <iframe
                  title={`Peta lokasi ${venue.venue}`}
                  src={venue.mapsEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-80 w-full sm:h-105"
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
