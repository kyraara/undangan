"use client"

import { Calendar, Clock, MapPin } from "lucide-react"
import { useConfig } from "@/lib/config-context"
import { AnimatedReveal } from "@/components/ui/animated-reveal"
import { SectionTitle } from "@/components/ui/section-title"
import { CountdownTimer } from "@/components/ui/countdown-timer"

function buildGoogleCalendarUrl(event: {
  title: string
  date: string
  time: string
  timeEnd?: string
  address: string
}) {
  const start = `${event.date.replace(/-/g, "")}T${event.time.replace(":", "")}00`
  const end = event.timeEnd
    ? `${event.date.replace(/-/g, "")}T${event.timeEnd.replace(":", "")}00`
    : start
  const url = new URL("https://calendar.google.com/calendar/render")
  url.searchParams.set("action", "TEMPLATE")
  url.searchParams.set("text", event.title)
  url.searchParams.set("dates", `${start}/${end}`)
  url.searchParams.set("location", event.address)
  return url.toString()
}

export function EventSection() {
  const { events, hero } = useConfig()
  const main = events[0]
  const targetIso = `${main.date}T${main.time}:00`
  const hasPhotoBg = !!(hero as { countdownImage?: string }).countdownImage

  return (
    <section
      id="event"
      className={`relative overflow-hidden px-6 py-24 text-(--color-text-light) sm:py-28 ${
        hasPhotoBg ? "" : "bg-gradient-dark"
      }`}
    >
      {/* Photo background */}
      {hasPhotoBg && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={(hero as { countdownImage?: string }).countdownImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/52" />
        </>
      )}

      {/* Fallback ornaments (shown only when no photo bg) */}
      {!hasPhotoBg && (
        <>
          <svg
            aria-hidden="true"
            className="absolute -left-16 top-10 h-72 w-72 text-(--color-gold)/15"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <path d="M20 80 Q 30 50, 50 40 Q 70 30, 85 18 L 82 22 Q 60 38, 45 52 Q 30 66, 22 82 Z" />
          </svg>
          <svg
            aria-hidden="true"
            className="absolute -right-16 bottom-10 h-72 w-72 rotate-180 text-(--color-gold)/15"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <path d="M20 80 Q 30 50, 50 40 Q 70 30, 85 18 L 82 22 Q 60 38, 45 52 Q 30 66, 22 82 Z" />
          </svg>
        </>
      )}

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

        {/* Simpan Tanggal button */}
        <AnimatedReveal variant="fadeUp" delay={220}>
          <div className="mt-6 flex justify-center">
            <a
              href={buildGoogleCalendarUrl({
                title: main.title,
                date: main.date,
                time: main.time,
                timeEnd: (main as { timeEnd?: string }).timeEnd,
                address: main.address,
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-(--color-gold)/50 bg-white/10 px-6 py-2.5 font-heading text-sm tracking-wider text-white shadow-[0_4px_24px_rgba(201,168,76,0.15)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-(--color-gold) hover:text-(--color-bg-dark)"
            >
              <Calendar className="h-4 w-4" />
              Simpan Tanggal
            </a>
          </div>
        </AnimatedReveal>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {events.map((event, idx) => (
            <AnimatedReveal key={event.id} variant="fadeUp" delay={300 + idx * 120}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-(--color-gold)/30 bg-white/4 p-8 backdrop-blur-sm transition hover:border-(--color-gold)/60">
                {/* Decorative corner */}
                <span
                  aria-hidden="true"
                  className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-(--color-gold)/10 transition-all group-hover:bg-(--color-gold)/20"
                />

                <div className="relative flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-(--color-gold)" />
                    <p className="font-display text-2xl text-(--color-gold-light)">
                      {event.id === "akad" ? "Akad" : "Resepsi"}
                    </p>
                  </div>

                  <h3 className="font-heading text-3xl font-semibold text-(--color-text-light) sm:text-4xl">
                    {event.title}
                  </h3>

                  <div className="space-y-3 text-(--color-text-light)/85">
                    <div className="flex items-start gap-3">
                      <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-(--color-gold-light)" />
                      <div>
                        <p className="font-medium">{event.day}, {event.dateDisplay}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-5 w-5 shrink-0 text-(--color-gold-light)" />
                      <p>{event.timeDisplay}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-(--color-gold-light)" />
                      <div>
                        <p className="font-medium text-(--color-text-light)">{event.venue}</p>
                        <p className="text-sm text-(--color-text-light)/70">{event.address}</p>
                      </div>
                    </div>
                  </div>

                  <a
                    href={event.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-(--color-gold) px-5 py-2 text-sm font-medium tracking-wide text-(--color-bg-dark) transition hover:bg-(--color-gold-light)"
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
