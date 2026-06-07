"use client"

import { useState } from "react"
import { MapPin, Navigation, Map, Eye } from "lucide-react"
import { useConfig } from "@/lib/config-context"
import { AnimatedReveal } from "@/components/ui/animated-reveal"
import { SectionTitle } from "@/components/ui/section-title"

const STREET_VIEW_URL =
  "https://www.google.com/maps/embed?pb=!4v1780839887736!6m8!1m7!1sf2JPizlwLPDi-QovxsU61w!2m2!1d-3.835968208138377!2d104.4433209581216!3f323.32622446348176!4f-10.356851923416428!5f0.7820865974627469"

export function VenueSection() {
  const { events } = useConfig()
  const venue = events[1]
  const [tab, setTab] = useState<"map" | "street">("map")

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
            {/* Info card */}
            <div className="md:col-span-2">
              <div className="rounded-3xl border border-(--color-gold)/30 bg-(--color-bg-primary)/60 p-8">
                <p className="font-display italic text-3xl font-light text-(--color-gold)">
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

            {/* Map / Street View panel */}
            <div className="md:col-span-3">
              {/* Tab switcher */}
              <div className="mb-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setTab("map")}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition ${
                    tab === "map"
                      ? "bg-(--color-gold) text-(--color-bg-dark)"
                      : "border border-(--color-gold)/40 text-(--color-text-secondary) hover:border-(--color-gold) hover:text-(--color-text-primary)"
                  }`}
                >
                  <Map className="h-3.5 w-3.5" />
                  Peta
                </button>
                <button
                  type="button"
                  onClick={() => setTab("street")}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition ${
                    tab === "street"
                      ? "bg-(--color-gold) text-(--color-bg-dark)"
                      : "border border-(--color-gold)/40 text-(--color-text-secondary) hover:border-(--color-gold) hover:text-(--color-text-primary)"
                  }`}
                >
                  <Eye className="h-3.5 w-3.5" />
                  Street View 360°
                </button>
              </div>

              {/* iframe container */}
              <div className="relative overflow-hidden rounded-3xl border border-(--color-gold)/30 shadow-card">
                {/* Regular map */}
                <iframe
                  key="map"
                  title={`Peta lokasi ${venue.venue}`}
                  src={venue.mapsEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className={`h-80 w-full sm:h-105 transition-opacity duration-300 ${tab === "map" ? "block opacity-100" : "hidden opacity-0"}`}
                  style={{ border: 0, filter: "saturate(0.85)" }}
                />
                {/* Street View */}
                <iframe
                  key="street"
                  title={`Street View ${venue.venue}`}
                  src={STREET_VIEW_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className={`h-80 w-full sm:h-105 transition-opacity duration-300 ${tab === "street" ? "block opacity-100" : "hidden opacity-0"}`}
                  style={{ border: 0 }}
                />
              </div>
            </div>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  )
}
