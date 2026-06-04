"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useConfig } from "@/lib/config-context"
import { AnimatedReveal } from "@/components/ui/animated-reveal"
import { SectionTitle } from "@/components/ui/section-title"

export function GallerySection() {
  const { gallery, hashtag } = useConfig()
  const [lightbox, setLightbox] = useState<number | null>(null)
  const touchStartX = useRef<number>(0)
  const touchStartY = useRef<number>(0)

  const next = () =>
    setLightbox((idx) => (idx === null ? null : (idx + 1) % gallery.length))
  const prev = () =>
    setLightbox((idx) =>
      idx === null ? null : (idx - 1 + gallery.length) % gallery.length,
    )

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    const deltaY = Math.abs(e.changedTouches[0].clientY - touchStartY.current)
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > deltaY) {
      if (deltaX < 0) next()
      else prev()
    }
  }

  // Keyboard navigation
  useEffect(() => {
    if (lightbox === null) return
    const len = gallery.length
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight")
        setLightbox((idx) => (idx === null ? null : (idx + 1) % len))
      else if (e.key === "ArrowLeft")
        setLightbox((idx) => (idx === null ? null : (idx - 1 + len) % len))
      else if (e.key === "Escape") setLightbox(null)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [lightbox, gallery.length])

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-(--color-bg-primary) px-6 py-24 sm:py-28"
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
              const featured = idx === 0 || idx === 3
              return (
                <button
                  type="button"
                  key={img.src + idx}
                  aria-label={img.alt || `Foto galeri ${idx + 1}`}
                  onClick={() => setLightbox(idx)}
                  className={`group relative overflow-hidden rounded-2xl ${
                    featured ? "col-span-2 row-span-2 aspect-square" : "aspect-3/4"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg"
                    }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-(--color-bg-dark)/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <span
                    aria-hidden="true"
                    className="absolute inset-3 rounded-xl border border-(--color-gold-light)/40 opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </button>
              )
            })}
          </div>
        </AnimatedReveal>

        <p className="mt-10 text-center font-heading text-sm italic text-(--color-text-secondary)">
          {hashtag}
        </p>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Lightbox foto"
          className="fixed inset-0 z-300 flex items-center justify-center bg-(--color-bg-dark)/90 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close */}
          <button
            type="button"
            aria-label="Tutup"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev */}
          <button
            type="button"
            aria-label="Sebelumnya"
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-8"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Next */}
          <button
            type="button"
            aria-label="Selanjutnya"
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-8"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Image */}
          <div
            className="relative flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={gallery[lightbox].src || "/placeholder.svg"}
              alt={gallery[lightbox].alt}
              className="max-h-[82vh] max-w-[88vw] rounded-sm object-contain"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg"
              }}
            />
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {gallery.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Foto ${idx + 1}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setLightbox(idx)
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === lightbox
                    ? "w-4 bg-white"
                    : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
