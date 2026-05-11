import { AnimatedReveal } from "@/components/ui/animated-reveal"
import { FloralDivider } from "@/components/ui/floral-divider"

export function OpeningSection() {
  return (
    <section
      id="opening"
      className="relative overflow-hidden bg-[var(--color-bg-primary)] px-6 py-24 sm:py-28"
    >
      {/* Decorative leaves */}
      <svg
        aria-hidden="true"
        className="absolute -left-10 top-12 h-40 w-40 text-[var(--color-sage)]/40 sm:h-56 sm:w-56"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M20 80 Q 30 50, 50 40 Q 70 30, 85 18 L 82 22 Q 60 38, 45 52 Q 30 66, 22 82 Z" />
        <ellipse cx="35" cy="58" rx="10" ry="4" transform="rotate(-30 35 58)" />
        <ellipse cx="50" cy="42" rx="10" ry="4" transform="rotate(-30 50 42)" />
      </svg>
      <svg
        aria-hidden="true"
        className="absolute -right-12 bottom-12 h-40 w-40 rotate-180 text-[var(--color-rose)]/30 sm:h-56 sm:w-56"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M20 80 Q 30 50, 50 40 Q 70 30, 85 18 L 82 22 Q 60 38, 45 52 Q 30 66, 22 82 Z" />
      </svg>

      <div className="relative mx-auto max-w-2xl text-center">
        <AnimatedReveal variant="fadeUp">
          <p className="font-display text-3xl text-[var(--color-gold)] sm:text-4xl">
            Bismillahirrahmanirrahim
          </p>
        </AnimatedReveal>

        <AnimatedReveal variant="fadeUp" delay={120}>
          <p className="mt-4 font-heading text-base italic text-[var(--color-text-secondary)] sm:text-lg">
            Assalamu&apos;alaikum Warahmatullahi Wabarakatuh
          </p>
        </AnimatedReveal>

        <FloralDivider />

        <AnimatedReveal variant="fadeUp" delay={220}>
          <p className="mx-auto max-w-xl text-pretty text-base leading-relaxed text-[var(--color-text-primary)] sm:text-lg sm:leading-relaxed">
            Dengan memohon rahmat dan ridho Allah Subhanahu wa Ta&apos;ala, kami
            bermaksud menyelenggarakan pernikahan putra-putri kami. Merupakan
            suatu kehormatan dan kebahagiaan bagi kami atas kehadiran dan doa
            restu yang Bapak / Ibu / Saudara/i berikan.
          </p>
        </AnimatedReveal>

        <FloralDivider />

        <AnimatedReveal variant="fadeUp" delay={320}>
          <p className="font-heading text-sm uppercase tracking-[0.3em] text-[var(--color-text-secondary)]">
            QS. Ar-Rum : 21
          </p>
          <p className="mt-3 text-pretty font-heading text-sm italic leading-relaxed text-[var(--color-text-primary)]/80 sm:text-base">
            “Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
            untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung
            dan merasa tenteram kepadanya...”
          </p>
        </AnimatedReveal>
      </div>
    </section>
  )
}
