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
      className={`fixed inset-0 z-200 overflow-hidden transition-transform duration-900 ease-in-out ${
        closing ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Background image */}
      {hero.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={hero.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">

        {/* "The Wedding of" */}
        <p className="anim-delay-150 text-xs uppercase tracking-[0.4em] text-(--color-gold-light)/80 animate-[fade-up_0.7s_cubic-bezier(0.16,1,0.3,1)_both]">
          The Wedding of
        </p>

        {/* Names */}
        <h1 className="anim-delay-300 mt-2 w-full font-display italic text-[11vw] font-light leading-none text-white sm:text-7xl animate-[fade-up_0.7s_cubic-bezier(0.16,1,0.3,1)_both]">
          {groom.nameShort}
          <span className="mx-[1.5vw] sm:mx-3 not-italic font-normal text-(--color-gold)">&</span>
          {bride.nameShort}
        </h1>

        {/* Divider */}
        <div
          className="anim-delay-450 my-5 flex items-center gap-3 text-(--color-gold) animate-[fade-up_0.7s_cubic-bezier(0.16,1,0.3,1)_both]"
          aria-hidden="true"
        >
          <span className="h-px w-12 bg-(--color-gold)/60" />
          <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2 C 14 6, 14 14, 10 18 C 6 14, 6 6, 10 2 Z" />
          </svg>
          <span className="h-px w-12 bg-(--color-gold)/60" />
        </div>

        {/* Date */}
        <p className="anim-delay-550 font-heading text-base italic text-white/75 animate-[fade-up_0.7s_cubic-bezier(0.16,1,0.3,1)_both]">
          {events[0].day}, {events[0].dateDisplay}
        </p>

        {/* Guest name — card hanya jika ada nama spesifik dari link admin */}
        {guestName ? (
          <div className="anim-delay-700 mt-8 w-full max-w-xs rounded-xl border border-(--color-gold)/25 bg-white/8 p-4 backdrop-blur-sm animate-[fade-up_0.7s_cubic-bezier(0.16,1,0.3,1)_both]">
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/55">
              Kepada Yth. Bapak/Ibu/Saudara/i
            </p>
            <p className="mt-1.5 font-heading text-xl font-semibold text-white">
              {guestName}
            </p>
          </div>
        ) : (
          <p className="anim-delay-700 mt-6 font-heading text-sm italic text-white/60 animate-[fade-up_0.7s_cubic-bezier(0.16,1,0.3,1)_both]">
            Kepada Yth. Bapak / Ibu / Saudara/i
          </p>
        )}

        {/* Button */}
        <button
          type="button"
          onClick={handleOpen}
          className="anim-delay-900 group mt-7 inline-flex items-center gap-2 rounded-full border border-(--color-gold)/50 bg-white/10 px-7 py-3 font-heading text-sm tracking-wider text-white shadow-[0_4px_32px_rgba(201,168,76,0.2)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-(--color-gold) hover:text-(--color-bg-dark) animate-[fade-up_0.7s_cubic-bezier(0.16,1,0.3,1)_both]"
        >
          <Mail className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
          Buka Undangan
        </button>

        {/* Disclaimer */}
        <p className="anim-delay-1100 mt-8 text-[10px] text-white/40 animate-[fade-in_0.7s_ease_both]">
          *Mohon maaf jika terdapat kesalahan penulisan nama &amp; gelar
        </p>
      </div>
    </div>
  )
}
