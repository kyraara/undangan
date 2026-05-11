"use client"

import { useEffect, useState } from "react"
import { Mail } from "lucide-react"
import { weddingConfig } from "@/lib/config"

interface LoadingScreenProps {
  onOpen: () => void
  guestName?: string
}

export function LoadingScreen({ onOpen, guestName }: LoadingScreenProps) {
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    // Prevent body scroll while splash is shown
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  const handleOpen = () => {
    setClosing(true)
    setTimeout(onOpen, 700)
  }

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-gradient-hero px-6 transition-opacity duration-700 ${
        closing ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 opacity-30">
        <svg
          className="absolute -left-10 -top-10 h-64 w-64 text-[var(--color-sage)]"
          viewBox="0 0 100 100"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M20 80 Q 30 50, 50 40 Q 70 30, 80 20 L 78 22 Q 60 35, 45 50 Q 30 65, 22 82 Z" />
        </svg>
        <svg
          className="absolute -bottom-10 -right-10 h-72 w-72 rotate-180 text-[var(--color-sage)]"
          viewBox="0 0 100 100"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M20 80 Q 30 50, 50 40 Q 70 30, 80 20 L 78 22 Q 60 35, 45 50 Q 30 65, 22 82 Z" />
        </svg>
      </div>

      <div className="relative z-10 flex max-w-md flex-col items-center text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.4em] text-[var(--color-text-secondary)]">
          The Wedding of
        </p>
        <h1 className="font-display text-6xl leading-none text-[var(--color-bg-dark)] sm:text-7xl">
          {weddingConfig.groom.nameShort}
          <span className="mx-2 text-[var(--color-gold)]">&</span>
          {weddingConfig.bride.nameShort}
        </h1>

        <div className="my-6 flex items-center gap-3 text-[var(--color-gold)]" aria-hidden="true">
          <span className="h-px w-12 bg-[var(--color-gold)]/60" />
          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2 C 14 6, 14 14, 10 18 C 6 14, 6 6, 10 2 Z" />
          </svg>
          <span className="h-px w-12 bg-[var(--color-gold)]/60" />
        </div>

        <p className="font-heading text-lg italic text-[var(--color-text-secondary)] sm:text-xl">
          Sabtu, 12 Juli 2026
        </p>

        <div className="mt-10 w-full rounded-2xl border border-[var(--color-gold)]/30 bg-[var(--color-bg-card)]/70 p-5 backdrop-blur-sm">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-text-secondary)]">
            Kepada Yth.
          </p>
          <p className="mt-2 font-heading text-xl font-medium text-[var(--color-bg-dark)] sm:text-2xl">
            {guestName || "Bapak / Ibu / Saudara/i"}
          </p>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            di Tempat
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpen}
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-bg-dark)] px-7 py-3 font-heading text-sm tracking-wider text-[var(--color-text-light)] shadow-card transition-all hover:-translate-y-0.5 hover:bg-[var(--color-gold)] hover:text-[var(--color-bg-dark)]"
        >
          <Mail className="h-4 w-4 transition-transform group-hover:rotate-12" />
          Buka Undangan
        </button>
      </div>
    </div>
  )
}
