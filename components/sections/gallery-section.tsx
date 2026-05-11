"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { weddingConfig } from "@/lib/config"
import { AnimatedReveal } from "@/components/ui/animated-reveal"
import { SectionTitle } from "@/components/ui/section-title"

export function GallerySection() {
  const { gallery } = weddingConfig
  const [lightbox, setLightbox] = useState<number | null>(null)

  const next = () =>
    setLightbox((idx) => (idx === null ? null : (idx + 1) % gallery.length))
  const prev = () =>
    setLightbox((idx) =>
      idx === null ? null : (idx - 1 + gallery.length) % gallery.length,
    )

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[var(--color-bg-primary)] px-6 py-24 sm:py-28"
    >
      <div className="relative mx-auto max-w-6xl">
        <AnimatedReveal>
          <SectionTitle
            eyebrow="Our Moments"
            title="Sepotong Cerita Kami"
            description="Setiap gambar menyimpan cerita yang tak terlupakan, sebuah perjalanan cinta yang diabadikan."
          />
        </AnimatedReveal>

        <AnimatedReveal variant="fadeUp" delay={150}>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {gallery.map((img, idx) => {
              // Asymmetric masonry feel
              const featured = idx === 0 || idx === 3
              return (
                <button
                  type="button"
                  key={img.src}
                  onClick={() => setLightbox(idx)}
                  className={`group relative overflow-hidden rounded-2xl ${
                    featured ? "col-span-2 row-span-2 aspect-square" : "aspect-[3/4]"
                  }`}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-dark)]/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <span
                    aria-hidden="true"
                    className="absolute inset-3 rounded-xl border border-[var(--color-gold-light)]/40 opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </button>
              )
            })}
          </div>
        </AnimatedReveal>

        <p className="mt-10 text-center font-heading text-sm italic text-[var(--color-text-secondary)]">
          {weddingConfig.hashtag}
        </p>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-[var(--color-bg-dark)]/90 p-4 backdrop-blur"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            aria-label="Tutup"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Sebelumnya"
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-8"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Selanjutnya"
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-8"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            className="relative h-full max-h-[80vh] w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={gallery[lightbox].src || "/placeholder.svg"}
              alt={gallery[lightbox].alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </section>
  )
}
