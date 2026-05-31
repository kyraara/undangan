"use client"

import { useConfig } from "@/lib/config-context"
import { AnimatedReveal } from "@/components/ui/animated-reveal"
import { SectionTitle } from "@/components/ui/section-title"

export function StorySection() {
  const { story } = useConfig()

  return (
    <section
      id="story"
      className="relative overflow-hidden bg-[var(--color-bg-primary)] px-6 py-24 sm:py-28"
    >
      <div className="relative mx-auto max-w-3xl">
        <AnimatedReveal>
          <SectionTitle
            eyebrow="Our Story"
            title="Sepenggal Cerita Kami"
            description="Setiap perjalanan memiliki babaknya. Inilah secuil kisah yang membawa kami ke hari istimewa."
          />
        </AnimatedReveal>

        <ol className="relative mt-16 space-y-10">
          {/* Vertical line */}
          <span
            aria-hidden="true"
            className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[var(--color-gold)]/50 to-transparent sm:left-1/2"
          />

          {story.map((item, idx) => {
            const isLeft = idx % 2 === 0
            return (
              <li key={item.year} className="relative">
                <AnimatedReveal variant="fadeUp" delay={idx * 80}>
                  <div
                    className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8 ${
                      isLeft ? "" : "sm:flex-row-reverse"
                    }`}
                  >
                    <div className={`sm:w-1/2 ${isLeft ? "sm:text-right" : "sm:text-left"} pl-12 sm:pl-0`}>
                      <p className="font-display text-4xl text-[var(--color-gold)] sm:text-5xl">
                        {item.year}
                      </p>
                      <h3 className="mt-1 font-heading text-xl font-semibold text-[var(--color-bg-dark)] sm:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-pretty leading-relaxed text-[var(--color-text-secondary)]">
                        {item.text}
                      </p>
                    </div>

                    {/* Dot */}
                    <div className="absolute left-4 top-2 -translate-x-1/2 sm:left-1/2">
                      <span className="block h-3 w-3 rounded-full bg-[var(--color-gold)] ring-4 ring-[var(--color-bg-primary)]" />
                    </div>

                    <div className="hidden sm:block sm:w-1/2" />
                  </div>
                </AnimatedReveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
