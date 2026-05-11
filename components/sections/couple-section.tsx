import Image from "next/image"
import { Instagram } from "lucide-react"
import { weddingConfig } from "@/lib/config"
import { AnimatedReveal } from "@/components/ui/animated-reveal"
import { SectionTitle } from "@/components/ui/section-title"

interface PersonProps {
  name: string
  nameShort: string
  childOrder: string
  father: string
  mother: string
  photo: string
  bio: string
  side: "left" | "right"
}

function PersonCard({
  name,
  childOrder,
  father,
  mother,
  photo,
  bio,
  side,
}: PersonProps) {
  return (
    <AnimatedReveal variant="fadeUp" delay={side === "left" ? 0 : 150}>
      <article className="group relative flex flex-col items-center text-center">
        <div className="relative">
          {/* Decorative ring */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -m-3 rounded-full border border-[var(--color-gold)]/40"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -m-6 rounded-full border border-dashed border-[var(--color-gold)]/25"
          />
          <div className="relative h-56 w-56 overflow-hidden rounded-full ring-4 ring-[var(--color-gold)]/40 sm:h-64 sm:w-64">
            <Image
              src={photo || "/placeholder.svg"}
              alt={`Foto ${name}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 224px, 256px"
            />
          </div>
        </div>

        <h3 className="mt-8 font-display text-5xl text-[var(--color-bg-dark)] sm:text-6xl">
          {name.split(" ")[0]}
        </h3>
        <p className="mt-1 font-heading text-2xl font-medium text-[var(--color-bg-dark)] sm:text-3xl">
          {name}
        </p>

        <p className="mt-4 text-sm uppercase tracking-[0.25em] text-[var(--color-gold)]">
          {childOrder} dari
        </p>
        <p className="mt-2 text-base leading-relaxed text-[var(--color-text-primary)] sm:text-lg">
          {father}
          <span className="mx-2 text-[var(--color-gold)]">&</span>
          {mother}
        </p>

        <p className="mt-6 max-w-xs text-pretty font-heading text-sm italic leading-relaxed text-[var(--color-text-secondary)]">
          {bio}
        </p>

        <button
          type="button"
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/40 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)] transition hover:border-[var(--color-gold)] hover:text-[var(--color-bg-dark)]"
        >
          <Instagram className="h-3.5 w-3.5" />
          @{name.toLowerCase().replace(/\s+/g, ".")}
        </button>
      </article>
    </AnimatedReveal>
  )
}

export function CoupleSection() {
  const { groom, bride } = weddingConfig

  return (
    <section
      id="couple"
      className="relative overflow-hidden bg-[var(--color-bg-card)] px-6 py-24 sm:py-28"
    >
      <div className="relative mx-auto max-w-5xl">
        <AnimatedReveal>
          <SectionTitle
            eyebrow="Mempelai"
            title="Dengan Hati yang Tulus"
            description="Dua hati yang dipertemukan dalam ridho-Nya, untuk menyempurnakan separuh agama."
          />
        </AnimatedReveal>

        <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-10">
          <PersonCard
            name={groom.name}
            nameShort={groom.nameShort}
            childOrder={groom.childOrder}
            father={groom.father}
            mother={groom.mother}
            photo={groom.photo}
            bio={groom.bio}
            side="left"
          />
          <PersonCard
            name={bride.name}
            nameShort={bride.nameShort}
            childOrder={bride.childOrder}
            father={bride.father}
            mother={bride.mother}
            photo={bride.photo}
            bio={bride.bio}
            side="right"
          />
        </div>
      </div>
    </section>
  )
}
