"use client"

import { Calendar, Clock, MapPin } from "lucide-react"
import { useConfig } from "@/lib/config-context"
import { AnimatedReveal } from "@/components/ui/animated-reveal"
import { SectionTitle } from "@/components/ui/section-title"
import { CountdownTimer } from "@/components/ui/countdown-timer"

export function EventSection() {
  const { events } = useConfig()
  const main = events[0]
  const targetIso = `${main.date}T${main.time}:00`

  return (
    <section
      id="event"
      className="relative overflow-hidden bg-gradient-dark px-6 py-24 text-[var(--color-text-light)] sm:py-28"
    >
      {/* Background ornaments */}
      <svg
        aria-hidden="true"
        className="absolute -left-16 top-10 h-72 w-72 text-[var(--color-gold)]/15"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M20 80 Q 30 50, 50 40 Q 70 30, 85 18 L 82 22 Q 60 38, 45 52 Q 30 66, 22 82 Z" />
      </svg>
      <svg
        aria-hidden="true"
        className="absolute -right-16 bottom-10 h-72 w-72 rotate-180 text-[var(--color-gold)]/15"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M20 80 Q 30 50, 50 40 Q 70 30, 85 18 L 82 22 Q 60 38, 45 52 Q 30 66, 22 82 Z" />
      </svg>

      <div className="relative mx-auto max-w-5xl">
        <AnimatedReveal>
          <SectionTitle
            eyebrow="Save The Date"
            title="Menghitung Hari"
            description="Dengan penuh syukur, kami menantikan kehadiran Bapak/Ibu/Saudara/i di hari istimewa kami."
            invert
          />
        </AnimatedReveal>

        <AnimatedReveal variant="fadeUp" delay={120}>
          <div className="mx-auto mt-12 max-w-2xl">
            <CountdownTimer targetDate={targetIso} invert />
          </div>
        </AnimatedReveal>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {events.map((event, idx) => (
            <AnimatedReveal key={event.id} variant="fadeUp" delay={200 + idx * 120}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-[var(--color-gold)]/30 bg-white/[0.04] p-8 backdrop-blur-sm transition hover:border-[var(--color-gold)]/60">
                {/* Decorative corner */}
                <span
                  aria-hidden="true"
                  className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[var(--color-gold)]/10 transition-all group-hover:bg-[var(--color-gold)]/20"
                />

                <div className="relative flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-[var(--color-gold)]" />
                    <p className="font-display text-2xl text-[var(--color-gold-light)]">
                      {event.id === "akad" ? "Akad" : "Resepsi"}
                    </p>
                  </div>

                  <h3 className="font-heading text-3xl font-semibold text-[var(--color-text-light)] sm:text-4xl">
                    {event.title}
                  </h3>

                  <div className="space-y-3 text-[var(--color-text-light)]/85">
                    <div className="flex items-start gap-3">
                      <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-gold-light)]" />
                      <div>
                        <p className="font-medium">{event.day}, {event.dateDisplay}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-gold-light)]" />
                      <p>{event.timeDisplay}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-gold-light)]" />
                      <div>
                        <p className="font-medium text-[var(--color-text-light)]">{event.venue}</p>
                        <p className="text-sm text-[var(--color-text-light)]/70">{event.address}</p>
                      </div>
                    </div>
                  </div>

                  <a
                    href={event.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-gold)] px-5 py-2 text-sm font-medium tracking-wide text-[var(--color-bg-dark)] transition hover:bg-[var(--color-gold-light)]"
                  >
                    <MapPin className="h-4 w-4" />
                    Lihat Lokasi
                  </a>
                </div>
              </article>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
