import Image from "next/image"
import { weddingConfig } from "@/lib/config"
import { Petals } from "@/components/ui/petals"

export function HeroSection() {
  const { groom, bride, hero, events } = weddingConfig
  const main = events[0]
  const [yyyy, mm, dd] = main.date.split("-")

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[var(--color-bg-dark)] px-6 py-20 text-center text-[var(--color-text-light)]"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={hero.image || "/placeholder.svg"}
          alt="Prewedding"
          fill
          priority
          className="object-cover opacity-50"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(44,62,45,0.35) 0%, rgba(26,30,27,0.85) 80%)",
          }}
        />
      </div>

      <Petals count={14} />

      {/* Corner ornaments */}
      <svg
        aria-hidden="true"
        className="absolute left-4 top-4 h-20 w-20 text-[var(--color-gold)]/70 sm:h-32 sm:w-32"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path d="M5 50 Q 15 25, 50 15 M 5 50 Q 20 45, 35 35 M 50 15 Q 45 30, 38 38" />
        <circle cx="50" cy="15" r="2" fill="currentColor" />
        <circle cx="5" cy="50" r="2" fill="currentColor" />
      </svg>
      <svg
        aria-hidden="true"
        className="absolute bottom-4 right-4 h-20 w-20 rotate-180 text-[var(--color-gold)]/70 sm:h-32 sm:w-32"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path d="M5 50 Q 15 25, 50 15 M 5 50 Q 20 45, 35 35 M 50 15 Q 45 30, 38 38" />
        <circle cx="50" cy="15" r="2" fill="currentColor" />
        <circle cx="5" cy="50" r="2" fill="currentColor" />
      </svg>

      <div className="relative z-10 flex flex-col items-center">
        <p className="font-display text-3xl text-[var(--color-gold-light)] sm:text-4xl">
          The Wedding of
        </p>

        <h1 className="mt-2 text-balance font-display text-6xl leading-none text-[var(--color-text-light)] sm:text-7xl md:text-8xl">
          {groom.nameShort}
          <span className="mx-3 text-[var(--color-gold)]">&</span>
          {bride.nameShort}
        </h1>

        <div className="my-8 flex items-center gap-4 text-[var(--color-gold)]" aria-hidden="true">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--color-gold)]" />
          <svg width="24" height="14" viewBox="0 0 40 20" fill="currentColor">
            <path d="M20 2 C 16 8, 8 8, 4 10 C 8 12, 16 12, 20 18 C 24 12, 32 12, 36 10 C 32 8, 24 8, 20 2 Z" />
          </svg>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--color-gold)]" />
        </div>

        <div className="grid grid-cols-3 items-center gap-4 sm:gap-8">
          <div className="text-center">
            <p className="font-display text-xl text-[var(--color-gold-light)]">
              {main.day}
            </p>
            <p className="font-heading text-4xl font-semibold tabular-nums sm:text-5xl">
              {dd}
            </p>
          </div>
          <div className="border-x border-[var(--color-gold)]/40 px-4 text-center">
            <p className="font-heading text-xs uppercase tracking-[0.25em] text-[var(--color-gold-light)] sm:text-sm">
              Juli
            </p>
          </div>
          <div className="text-center">
            <p className="font-display text-xl text-[var(--color-gold-light)]">
              Tahun
            </p>
            <p className="font-heading text-4xl font-semibold tabular-nums sm:text-5xl">
              {yyyy}
            </p>
          </div>
        </div>

        <p className="mt-10 max-w-md text-pretty font-heading text-sm italic leading-relaxed text-[var(--color-text-light)]/80 sm:text-base">
          “{hero.tagline}”
        </p>

        {/* Scroll hint */}
        <div className="float-y mt-12 flex flex-col items-center gap-2 text-[var(--color-gold-light)]/80">
          <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="1" y="1" width="12" height="18" rx="6" />
            <path d="M7 5 v 4" />
          </svg>
        </div>
      </div>
    </section>
  )
}
