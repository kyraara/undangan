"use client"

import { useEffect, useState } from "react"
import { Mail } from "lucide-react"
import { useConfig } from "@/lib/config-context"

interface LoadingScreenProps {
  onOpen: () => void
  guestName?: string
}

export function LoadingScreen({ onOpen, guestName }: LoadingScreenProps) {
  const { groom, bride, events, hero } = useConfig()
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  const handleOpen = () => {
    setClosing(true)
    setTimeout(onOpen, 900)
  }

  return (
    <div
      className={`loading-screen fixed inset-0 z-200 flex items-center justify-center overflow-hidden px-6 ${
        closing ? "-translate-y-full opacity-0" : "opacity-100"
      }`}
    >
      {/* Hero image background */}
      {hero.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={hero.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-(--color-bg-dark)/65" />

      {/* Botanical ornaments */}
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <svg
          className="absolute -left-10 -top-10 h-64 w-64 text-(--color-sage)"
          viewBox="0 0 100 100"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M20 80 Q 30 50, 50 40 Q 70 30, 80 20 L 78 22 Q 60 35, 45 50 Q 30 65, 22 82 Z" />
        </svg>
        <svg
          className="absolute -bottom-10 -right-10 h-72 w-72 rotate-180 text-(--color-rose)"
          viewBox="0 0 100 100"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M20 80 Q 30 50, 50 40 Q 70 30, 80 20 L 78 22 Q 60 35, 45 50 Q 30 65, 22 82 Z" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex max-w-md flex-col items-center text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.4em] text-(--color-gold-light)/80">
          The Wedding of
        </p>
        <h1 className="font-display text-6xl leading-none text-white sm:text-7xl">
          {groom.nameShort}
          <span className="mx-2 text-(--color-gold)">&</span>
          {bride.nameShort}
        </h1>

        <div className="my-6 flex items-center gap-3 text-(--color-gold)" aria-hidden="true">
          <span className="h-px w-12 bg-(--color-gold)/60" />
          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2 C 14 6, 14 14, 10 18 C 6 14, 6 6, 10 2 Z" />
          </svg>
          <span className="h-px w-12 bg-(--color-gold)/60" />
        </div>

        <p className="font-heading text-lg italic text-white/80 sm:text-xl">
          {events[0].day}, {events[0].dateDisplay}
        </p>

        <div className="mt-10 w-full rounded-2xl border border-(--color-gold)/30 bg-white/10 p-5 backdrop-blur-sm">
          <p className="text-xs uppercase tracking-[0.25em] text-white/60">
            Kepada Yth.
          </p>
          <p className="mt-2 font-heading text-xl font-medium text-white sm:text-2xl">
            {guestName || "Bapak / Ibu / Saudara/i"}
          </p>
          <p className="mt-1 text-sm text-white/60">
            di Tempat
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpen}
          className="group mt-8 inline-flex items-center gap-2 rounded-full border border-(--color-gold)/50 bg-white/10 px-7 py-3 font-heading text-sm tracking-wider text-white shadow-[0_4px_32px_rgba(201,168,76,0.2)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-(--color-gold) hover:text-(--color-bg-dark)"
        >
          <Mail className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
          Buka Undangan
        </button>
      </div>
    </div>
  )
}
