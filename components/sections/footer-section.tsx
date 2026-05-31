"use client"

import { Heart } from "lucide-react"
import { useConfig } from "@/lib/config-context"
import { FloralDivider } from "@/components/ui/floral-divider"
import { AnimatedReveal } from "@/components/ui/animated-reveal"

export function FooterSection() {
  const { groom, bride, events } = useConfig()

  return (
    <footer className="relative overflow-hidden bg-[var(--color-bg-dark)] px-6 py-20 text-center text-[var(--color-text-light)]">
      {/* Decorative leaves */}
      <svg
        aria-hidden="true"
        className="absolute -left-12 top-8 h-44 w-44 text-[var(--color-gold)]/20"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M20 80 Q 30 50, 50 40 Q 70 30, 85 18 L 82 22 Q 60 38, 45 52 Q 30 66, 22 82 Z" />
      </svg>
      <svg
        aria-hidden="true"
        className="absolute -right-12 bottom-8 h-44 w-44 rotate-180 text-[var(--color-gold)]/20"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M20 80 Q 30 50, 50 40 Q 70 30, 85 18 L 82 22 Q 60 38, 45 52 Q 30 66, 22 82 Z" />
      </svg>

      <div className="relative mx-auto max-w-2xl">
        <AnimatedReveal>
          <p className="font-display text-3xl text-[var(--color-gold-light)] sm:text-4xl">
            Wassalamu&apos;alaikum
          </p>
          <p className="mt-2 text-sm uppercase tracking-[0.3em] text-[var(--color-gold-light)]/70">
            Warahmatullahi Wabarakatuh
          </p>

          <FloralDivider />

          <p className="mx-auto max-w-xl text-pretty leading-relaxed text-[var(--color-text-light)]/85 sm:text-lg">
            Merupakan suatu kehormatan bagi kami atas kehadiran
            Bapak/Ibu/Saudara/i. Terima kasih atas doa dan restu yang telah
            diberikan.
          </p>

          <p className="mt-10 text-xs uppercase tracking-[0.3em] text-[var(--color-gold-light)]/70">
            Kami yang berbahagia
          </p>

          <h2 className="mt-3 font-display text-5xl text-[var(--color-text-light)] sm:text-6xl">
            {groom.nameShort}
            <span className="mx-3 text-[var(--color-gold)]">&</span>
            {bride.nameShort}
          </h2>
          <p className="mt-2 text-sm italic text-[var(--color-text-light)]/70">
            beserta keluarga
          </p>
        </AnimatedReveal>

        <div className="mt-14 flex flex-col items-center gap-2 border-t border-[var(--color-gold)]/20 pt-6 text-xs text-[var(--color-text-light)]/60">
          <p className="flex items-center gap-1.5">
            Made with <Heart className="h-3 w-3 fill-[var(--color-rose)] text-[var(--color-rose)]" /> for {groom.nameShort} & {bride.nameShort}
          </p>
          <p>{events[0].dateDisplay}</p>
        </div>
      </div>
    </footer>
  )
}
